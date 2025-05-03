import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Color, combineReplacements, getImageDataFromImage, findClosestColor, getColorPropertiesMap, getColorsInImage, Replacement, sortMapByCount, sortSimilaritiesByDistance, getImageSrcFromImageData } from "./image";
import { QUICK_COLOR_CLOSENESS_THRESHOLD, QUICK_COUNT_THRESHOLD } from "./config";

const Stitch = () => {
    const [originalImageSrc, setOriginalImageSrc] = useState<string | undefined>(undefined);
    const [modifiedImageSrc, setModifiedImageSrc] = useState<string | undefined>(undefined);
    const imgFileRef = useRef<HTMLInputElement>(null);
    const [originalImageData, setOriginalImageData] = useState<ImageData | undefined>(undefined);

    const [quickReplacements, setQuickReplacements] = useState<Replacement[]>([]);
    const [mostRecentReplacement, setMostRecentReplacement] = useState<Replacement | undefined>(undefined);

    const [autoEnableQuickReplacements, setAutoEnableQuickReplacements] = useState(true);

    // this assumes no transparency in upload!
    const imageColors : Color[] | undefined = useMemo(() => {
        if (!originalImageData) return undefined;
        return getColorsInImage(originalImageData);
    }, [originalImageData]);

    const colorPropertiesMap = useMemo(() => {
        if (!imageColors) return undefined;
        return getColorPropertiesMap(imageColors);
    }, [imageColors]);

    const [lowCountReplacements, colorsByCount] = useMemo(() => {
        if (!colorPropertiesMap) return [[], []];
        const colorPropertiesMapSorted = sortMapByCount(colorPropertiesMap);

        const quickReplacements: Replacement[] = [];
        const colorsByCount: typeof colorPropertiesMapSorted = [];

        colorPropertiesMapSorted.forEach((color, index) => {
            if (color[1].count < QUICK_COUNT_THRESHOLD) {
                // add to replacements [color1[0], {the colour, from the set of colours with a higher count, with the closest distance}, distance]
                const closest = findClosestColor(color, colorPropertiesMapSorted.slice(0, index));
                quickReplacements.push([color[0], closest[0], closest[1]]);
                return;
            }
            
            colorsByCount.push(color);
        });
        
        return [quickReplacements, colorsByCount];
    }, [colorPropertiesMap]);
    

    const [similarColorReplacements, colorSimilarities] = useMemo(() => {
        if (!colorsByCount) return [[], []];
        const similarities: Record<string, Record<string, number>> = {};
        const quickReplacements: Replacement[] = lowCountReplacements ?? [];        

        colorsByCount.forEach((color1, index) => {
            similarities[color1[0]] = {};

            colorsByCount.slice(index + 1).forEach((color2) => {
                const distance = Color.distanceSquared(color1[1].col, color2[1].col);

                if (distance < QUICK_COLOR_CLOSENESS_THRESHOLD) {
                    quickReplacements.push([color2[0], color1[0], distance]);
                    return;
                }

                similarities[color1[0]][color2[0]] = distance;
            });
        });

        // convert similarities to a [col1key, col2key, distance] array
        return [quickReplacements, sortSimilaritiesByDistance(similarities)];
    }, [colorPropertiesMap]);

    useEffect(() => {
        setQuickReplacements([...lowCountReplacements, ...similarColorReplacements]);
    }, [lowCountReplacements, similarColorReplacements]);

    const colorReplacements = useMemo(() => { // direct replacement; no blending
        if (!colorSimilarities || !colorPropertiesMap) return [];
        const newColors = colorSimilarities;
        const replacements: Replacement[] = [];
        const seen = new Set<string>();

        for (const color of newColors) {
            const [col1key, col2key, distance] = color;
            if (seen.has(col1key) || seen.has(col2key)) continue;
            const col1Count = colorPropertiesMap[col1key].count;
            const col2Count = colorPropertiesMap[col2key].count;
            // TODO: try blending
            if (col1Count > col2Count) {
                replacements.push([col2key as string, col1key as string, distance]);
                seen.add(col2key);
            } else {
                replacements.push([col1key as string, col2key as string, distance]);
                seen.add(col1key);
            }
        }
        return replacements;
    }, [colorSimilarities, colorPropertiesMap]);

    const applyColorReplacements = useCallback((replacementsToApply: number) => {
        if (!originalImageData) return;
        const newImageDataData = new Uint8ClampedArray(originalImageData.data.length);

        const allReplacements = [...quickReplacements, ...colorReplacements].sort((a, b) => a[2] - b[2]).slice(0, replacementsToApply);
        setMostRecentReplacement(allReplacements[replacementsToApply - 1]);
        const finalReplacements = combineReplacements(allReplacements);

        for (let i = 0; i < originalImageData.data.length; i += 4) {
            const r = originalImageData.data[i];
            const g = originalImageData.data[i + 1];
            const b = originalImageData.data[i + 2];
            const key = new Color(r, g, b).toKey();
            if (finalReplacements[key] && colorPropertiesMap) {
                const newKey = finalReplacements[key];
                const newColor = colorPropertiesMap[newKey].col;
                if (!newColor) continue;
                newImageDataData[i] = newColor.r;
                newImageDataData[i + 1] = newColor.g;
                newImageDataData[i + 2] = newColor.b;
                newImageDataData[i + 3] = 255;
            } else {
                newImageDataData[i] = r;
                newImageDataData[i + 1] = g;
                newImageDataData[i + 2] = b;
                newImageDataData[i + 3] = 255;
            }
        }

        const newImageData = new ImageData(newImageDataData, originalImageData.width, originalImageData.height);
        setModifiedImageSrc(getImageSrcFromImageData(newImageData));
    }, [originalImageData, colorReplacements, quickReplacements, colorPropertiesMap]);

    useEffect(() => {
        applyColorReplacements(autoEnableQuickReplacements ? quickReplacements.length : 0);
    }, [originalImageData]);

    // based heavily on https://stackoverflow.com/a/13939150!
    const loadImage = () => {
        let fileReader: FileReader | null = null;

        if (typeof window.FileReader !== 'function') {
            alert("The file API isn't supported on this browser yet.");
            return;
        }
        else if (!imgFileRef.current || !imgFileRef.current.files) {
            alert("Something went wrong. Please try again, or try using a different browser.");
            return;
        }
        else if (!imgFileRef.current.files[0]) {
            alert("Please select a file before clicking 'Load'.");
            return;
        }

        const file = imgFileRef.current.files[0];
        fileReader = new FileReader();
        fileReader.onload = createImage;
        fileReader.readAsDataURL(file);

        function createImage() {
            const newImg = new Image();
            newImg.onload = () => {
                const imageData = getImageDataFromImage(newImg);
                setOriginalImageData(imageData);
            };
            const src = fileReader?.result as string;
            newImg.src = src;
            setOriginalImageSrc(src);
        }
    };

    return <>
        <form action='#'>
            <input type='file' ref={imgFileRef} />
            <input type='button' value='Load' onClick={loadImage} />
        </form>
        <div className="w-100 d-flex p-5 justify-content-center gap-5 stitch-image-container">
            {originalImageSrc && <img src={originalImageSrc} alt="Uploaded" />}
            {modifiedImageSrc && <img src={modifiedImageSrc} alt="Modified" />}
        </div>
        <input id="range_inp" type="range" min={autoEnableQuickReplacements ? quickReplacements.length : 0} max={colorReplacements.length + Object.keys(quickReplacements).length} step={1} defaultValue={0} onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            applyColorReplacements(value);
        }} />
        <br/>
        <input id="quick_replace" type="checkbox" checked={autoEnableQuickReplacements} onChange={(e) => {
            setAutoEnableQuickReplacements(e.target.checked);
        }} />
        <span>{parseInt((document.getElementById("range_inp") as HTMLInputElement)?.value || "0", 10)}</span>
        <br/>
        <span>Quick replacements: {quickReplacements.length}</span>
        <br/>
        {mostRecentReplacement && <>
            <span>{mostRecentReplacement[0]} {" => "} {mostRecentReplacement[1]} @ {mostRecentReplacement[2]}</span>
            <br/>
            <span>(replaced {colorPropertiesMap?.[mostRecentReplacement[0]]?.count} pixels)</span>
            <br/>
        </>}
        {originalImageData?.data.length}
    </>;
};

export default Stitch;

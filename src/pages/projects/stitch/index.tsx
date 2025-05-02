import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// @ts-expect-error no types
import * as cc from '../../../scripts/modules/colourConversions.js';

const QUICK_COLOR_CLOSENESS_THRESHOLD = 10;
const QUICK_COUNT_THRESHOLD = 20;

class Color {
    r: number;
    g: number;
    b: number;
    lab: number[];

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.lab = cc.rgbToLab([r, g, b]);
    }

    toKey() {
        return `${this.r}`.padStart(3, '0') + `${this.g}`.padStart(3, '0') + `${this.b}`.padStart(3, '0');
    }

    static distanceSquared(c1: Color, c2: Color) {
        // return Math.pow(c1.x - c2.x, 2) + Math.pow(c1.y - c2.y, 2) + Math.pow(c1.z - c2.z, 2);
        return cc.LABdeltaESquared(c1.lab, c2.lab);
    }
}

const Stitch = () => {
    const canvasOriginalRef = useRef<HTMLCanvasElement>(null);
    const canvasUpdatedRef = useRef<HTMLCanvasElement>(null);
    const imgFileRef = useRef<HTMLInputElement>(null);
    const [originalImageData, setOriginalImageData] = useState<ImageData | undefined>(undefined);
    const [updatedImageData, setUpdatedImageData] = useState<ImageData | undefined>(undefined);

    const [quickReplacements, setQuickReplacements] = useState<[string, string, number][]>([]);
    const [mostRecentReplacement, setMostRecentReplacement] = useState<[string, string, number] | undefined>(undefined);

    // this assumes no transparency in upload!
    const imageColors : Color[] | undefined = useMemo(() => {
        if (!originalImageData) return undefined;
        return Array.from(originalImageData.data).reduce((acc, _, i) => {
            if (i % 4 === 0) {
                const r = originalImageData.data[i];
                const g = originalImageData.data[i + 1];
                const b = originalImageData.data[i + 2];
                acc.push(new Color(r, g, b));
            }
            return acc;
        }, [] as Color[]);
    }, [originalImageData]);

    const colorByIdMap = useMemo(() => {
        if (!imageColors) return {};
        const counts: Record<string, {col: Color, count: number}> = {};
        imageColors.forEach((color) => {
            const key = color.toKey();
            if (counts[key]) {
                counts[key].count += 1;
            } else {
                counts[key] = {col: color, count: 1};
            }
        });
        return counts;
    }, [imageColors]);

    // console.log(Object.entries(colorByIdMap).filter(([key, value]) => value.count > 30).length, Object.entries(colorByIdMap).length);

    const colorByIdMapSorted = useMemo(() => {
        if (!colorByIdMap) return [];
        return Object.entries(colorByIdMap).sort((a, b) => {
            const countA = a[1].count;
            const countB = b[1].count;
            return countB - countA; // sort by count descending
        });
    }, [colorByIdMap]);
    

    const colorSimilarities = useMemo(() => {
        if (!colorByIdMapSorted) return [];
        const colorByIdMapAboveThreshold: typeof colorByIdMapSorted = [];
        const similarities: Record<string, Record<string, number>> = {};
        const replacements: [string, string, number][] = [];

        colorByIdMapSorted.forEach((color1, index) => {
            if (color1[1].count < QUICK_COUNT_THRESHOLD) {
                // add to replacements [color1[0], {the colour, from the set of colours with a higher count, with the closest distance}, distance]
                const closest = colorByIdMapSorted.slice(0, index).reduce<[string, number]>((acc, color2) => {
                    if (color2[1].count < QUICK_COUNT_THRESHOLD) return acc;
                    const distance = Color.distanceSquared(color1[1].col, color2[1].col);
                    if (distance < acc[1]) {
                        return [color2[0], distance];
                    }
                    return acc;
                }, [color1[0], Infinity]);

                replacements.push([color1[0], closest[0], closest[1]]);

                console.log(`Color ${color1[0]} (${color1[1].count}) is similar to ${closest[0]} (${colorByIdMap[closest[0]].count}) with distance ${closest[1]}`);

                return;
            } else {
                colorByIdMapAboveThreshold.push(color1);
            }
        });

        colorByIdMapAboveThreshold.forEach((color1, index) => {
            similarities[color1[0]] = {};
            let distance = Infinity;

            colorByIdMapAboveThreshold.slice(index + 1).forEach((color2) => {
                distance = Color.distanceSquared(color1[1].col, color2[1].col);

                if (distance < QUICK_COLOR_CLOSENESS_THRESHOLD) {
                    replacements.push([color2[0], color1[0], distance]);
                    return;
                }

                similarities[color1[0]][color2[0]] = distance;
            });
        });

        setQuickReplacements(replacements);

        // convert similarities to a [col1key, col2key, distance] array
        const similarityArray = Object.entries(similarities).flatMap(([col1key, col2s]) => {
            return Object.entries(col2s).map(([col2key, distance]) => {
                return [col1key, col2key, distance];
            });
        });

        return similarityArray.sort((a, b) => {
            const distA = a[2] as number;
            const distB = b[2] as number;
            return distA - distB;
        });
    }, [colorByIdMap]);

    const colorReplacements = useMemo(() => { // direct replacement; no blending
        const newColors = colorSimilarities;
        const replacements: [string, string, number][] = [];
        const seen = new Set<string>();

        for (const color of newColors) {
            const [col1key, col2key, distance] = color as [string, string, number];
            if (seen.has(col1key) || seen.has(col2key)) continue;
            const col1Count = colorByIdMap[col1key].count;
            const col2Count = colorByIdMap[col2key].count;
            // TODO: try blending
            if (col1Count > col2Count) {
                replacements.push([col2key as string, col1key as string, distance]);
                seen.add(col2key);
                // newColors = newColors.filter(([a, b]) => a !== col2key && b !== col2key);
            } else {
                replacements.push([col1key as string, col2key as string, distance]);
                seen.add(col1key);
                // newColors = newColors.filter(([a, b]) => a !== col1key && b !== col1key);
            }
        }
        return replacements;
    }, [colorSimilarities, colorByIdMap]);

    // console.log(quickReplacements, colorReplacements);

    const applyColorReplacements = useCallback((replacementsToApply: number) => {
        if (!originalImageData) return;
        const newImageDataData = new Uint8ClampedArray(originalImageData.data.length);

        const allReplacements = [...quickReplacements, ...colorReplacements].sort((a, b) => a[2] - b[2]).slice(0, replacementsToApply);

        setMostRecentReplacement(allReplacements[replacementsToApply - 1]);
        
        const finalReplacements : Record<string, string> = allReplacements.reduce((acc, [col1key, col2key], index) => {
            let mappedKey = col2key;
            while (true) {
                const found = allReplacements.slice(index).find(x => x[0] === mappedKey);
                if (!found) break;
                mappedKey = found[1];
            }
            acc[col1key] = mappedKey;
            return acc;
        }, {} as Record<string, string>);

        for (let i = 0; i < originalImageData.data.length; i += 4) {
            const r = originalImageData.data[i];
            const g = originalImageData.data[i + 1];
            const b = originalImageData.data[i + 2];
            const key = new Color(r, g, b).toKey();
            if (finalReplacements[key]) {
                const newKey = finalReplacements[key];
                const newColor = colorByIdMap[newKey].col;
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
        setUpdatedImageData(newImageData);
    }, [originalImageData, colorReplacements, quickReplacements, colorByIdMap]);

    useEffect(() => {
        const ctx = canvasUpdatedRef.current?.getContext("2d");
        if (!canvasUpdatedRef.current || !ctx || !updatedImageData) return;
        canvasUpdatedRef.current.width = updatedImageData.width;
        canvasUpdatedRef.current.height = updatedImageData.height;
        ctx.putImageData(updatedImageData, 0, 0);
    }, [updatedImageData]);

    // based heavily on https://stackoverflow.com/a/13939150!
    let img: HTMLImageElement;
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
            img = new Image();
            img.onload = drawImageToCanvas;
            img.src = fileReader?.result as string;
        }

        function drawImageToCanvas() {
            if (canvasOriginalRef.current === null) return;
            
            canvasOriginalRef.current.width = img.width;
            canvasOriginalRef.current.height = img.height;
            const ctx = canvasOriginalRef.current.getContext("2d");

            ctx?.drawImage(img, 0, 0);
            setOriginalImageData(ctx?.getImageData(0, 0, img.width, img.height));
        }
    };

    return <>
        <form action='#'>
            <input type='file' ref={imgFileRef} />
            <input type='button' value='Load' onClick={loadImage} />
        </form>
        <div className="w-100 d-flex gap-5">
            <canvas ref={canvasOriginalRef} />
            <canvas ref={canvasUpdatedRef} />
        </div>
        <input id="range_inp" type="range" min={0} max={colorReplacements.length + Object.keys(quickReplacements).length} step={1} defaultValue={0} onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            applyColorReplacements(value);
        }} />
        <br/>
        <span>{parseInt((document.getElementById("range_inp") as HTMLInputElement)?.value || "0", 10)}</span>
        <br/>
        <span>Quick replacements: {quickReplacements.length}</span>
        <br/>
        {mostRecentReplacement && <>
            <span>{mostRecentReplacement[0]} {" => "} {mostRecentReplacement[1]} @ {mostRecentReplacement[2]}</span>
            <br/>
            <span>(replaced {colorByIdMap[mostRecentReplacement[0]]?.count} pixels)</span>
            <br/>
        </>}
        {originalImageData?.data.length}
    </>;
};

export default Stitch;

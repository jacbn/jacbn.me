// @ts-expect-error no types
import * as cc from '../../../scripts/modules/colourConversions.js';
import { QUICK_COUNT_THRESHOLD } from './config.js';

export class Color {
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

export interface ColorProperty {
    col: Color;
    count: number;
}

export type Replacement = [string, string, number];

export type Similarity = [string, string, number];

export const getColorsInImage = (imageData: ImageData) => {
    return Array.from(imageData.data).reduce((acc, _, i) => {
        if (i % 4 === 0) {
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            acc.push(new Color(r, g, b));
        }
        return acc;
    }, [] as Color[]);
};

export const getColorPropertiesMap = (colors: Color[]) => {
    if (!colors) return {};
    const counts: Record<string, ColorProperty> = {};
    colors.forEach((color) => {
        const key = color.toKey();
        if (counts[key]) {
            counts[key].count += 1;
        } else {
            counts[key] = {col: color, count: 1};
        }
    });
    return counts;
};

export const sortMapByCount = (map: Record<string, ColorProperty>) : [string, ColorProperty][] => {
    return Object.entries(map).sort((a, b) => {
        const countA = a[1].count;
        const countB = b[1].count;
        return countB - countA; // sort by count descending
    });
};

export const sortSimilaritiesByDistance = (similarities: Record<string, Record<string, number>>) : Similarity[] => {
    const similarityArray = Object.entries(similarities).flatMap(([col1key, col2s]) => {
        return Object.entries(col2s).map(([col2key, distance]) => {
            return [col1key, col2key, distance] as Similarity;
        });
    });

    return similarityArray.sort((a, b) => {
        const distA = a[2] as number;
        const distB = b[2] as number;
        return distA - distB;
    });
};

/**
 * Finds the closest color to color1 in the provided array that has a frequency of at least QUICK_COUNT_THRESHOLD.
 * @param color1 - The color to compare against.
 * @param options - An array of color properties to compare against color1.
 * @returns The closest color and its distance.
 */
export const findClosestColor = (color1: [string, ColorProperty], options: [string, ColorProperty][]) => {
    return options.reduce<[string, number]>((acc, color2) => {
        if (color2[1].count < QUICK_COUNT_THRESHOLD) return acc;
        const distance = Color.distanceSquared(color1[1].col, color2[1].col);
        if (distance < acc[1]) {
            return [color2[0], distance];
        }
        return acc;
    }, [color1[0], Infinity]);
};

export const combineReplacements = (replacements: Replacement[]): Record<string, string> => {
    return replacements.reduce((acc, [col1key, col2key], index) => {
        let mappedKey = col2key;
        while (true) {
            const found = replacements.slice(index).find(x => x[0] === mappedKey);
            if (!found) break;
            mappedKey = found[1];
        }
        acc[col1key] = mappedKey;
        return acc;
    }, {} as Record<string, string>);
};

export const getImageDataFromImage = (image: HTMLImageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
};

export const drawImageDataToCanvas = (canvas: HTMLCanvasElement | null, imageData?: ImageData) => {
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !imageData) return;
    ctx.putImageData(imageData, 0, 0);
};

export const getImageSrcFromImageData = (imageData?: ImageData) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !imageData) return;
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
};

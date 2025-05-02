//hsl-rgb conversions created by mjijackson: 
//https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c


/**
 * Converts from the HSL colour space to RGB.
 * @param {Number} h Hue, 0-359
 * @param {Number} s Saturation, 0-1
 * @param {Number} l Lightness, 0-1
 * @returns [r, g, b], each ranging 0-255.
 */
export function hslToRgb(h, s, l){
    var r, g, b;
    h /= 360;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Converts from the RGB colour space to HSL.
 * @param {Number} r red, 0-255
 * @param {Number} g green, 0-255
 * @param {Number} b blue, 0-255
 * @returns [h, s, l] with h ranging from 0-359, s and l ranging from 0-1.
 */
export function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

//hex conversions my own

/**
 * Convert from a hex representation of the RGB colour space to HSL.
 * @param {string} col Hex valued colour. Includes the hash.
 * @returns [h, s, l] with h ranging from 0-359, s and l ranging from 0-1.
 */
export function hexToHsl(col) {
    return rgbToHsl(
        parseInt('0x' + col.charAt(1) + col.charAt(2)),
        parseInt('0x' + col.charAt(3) + col.charAt(4)),
        parseInt('0x' + col.charAt(5) + col.charAt(6))
    );
}

/**
 * Converts from the HSL colour space to a hex representation of RGB.
 * @param {Number} h Hue, 0-359
 * @param {Number} s Saturation, 0-1
 * @param {Number} l Lightness, 0-1
 * @returns {string} Hex representation (of RGB). Includes the hash.
 */
export function hslToHex(h, s, l) {
    const [r, g, b] = hslToRgb(h, s, l);
    return rgbToHex(r, g, b);
}

/**
 * Converts from RGB to hex.
 * @param {Number} r red, 0-255
 * @param {Number} g green, 0-255
 * @param {Number} b blue, 0-255
 * @returns {string} Hex representation. Includes the hash.
 */
export function rgbToHex(r, g, b) {
    return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
}


// https://github.com/antimatter15/rgb-lab/blob/master/color.js
// the following functions are based off of the pseudocode
// found on www.easyrgb.com

export function labToRgb(lab){
    var y = (lab[0] + 16) / 116,
        x = lab[1] / 500 + y,
        z = y - lab[2] / 200,
        r, g, b;
  
    x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16/116) / 7.787);
    y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16/116) / 7.787);
    z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16/116) / 7.787);
  
    r = x *  3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y *  1.8758 + z *  0.0415;
    b = x *  0.0557 + y * -0.2040 + z *  1.0570;
  
    r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1/2.4) - 0.055) : 12.92 * r;
    g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1/2.4) - 0.055) : 12.92 * g;
    b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1/2.4) - 0.055) : 12.92 * b;
  
    return [Math.max(0, Math.min(1, r)) * 255, 
            Math.max(0, Math.min(1, g)) * 255, 
            Math.max(0, Math.min(1, b)) * 255]
}
  
  
export function rgbToLab(rgb){
    var r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255,
        x, y, z;
  
    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
  
    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  
    x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
    y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
    z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
  
    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}
  
// calculate the perceptual distance between colors in CIELAB
// https://github.com/THEjoezack/ColorMine/blob/master/ColorMine/ColorSpaces/Comparisons/Cie94Comparison.cs
  
export function LABdeltaESquared(labA, labB){
    var deltaL = labA[0] - labB[0];
    var deltaA = labA[1] - labB[1];
    var deltaB = labA[2] - labB[2];
    var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    var deltaC = c1 - c2;
    var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    var sc = 1.0 + 0.045 * c1;
    var sh = 1.0 + 0.015 * c1;
    var deltaLKlsl = deltaL / (1.0);
    var deltaCkcsc = deltaC / (sc);
    var deltaHkhsh = deltaH / (sh);
    var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    // return i < 0 ? 0 : Math.sqrt(i);
    return Math.max(0, i);
}

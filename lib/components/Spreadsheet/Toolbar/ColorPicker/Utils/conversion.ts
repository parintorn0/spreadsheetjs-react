import type { HsvColor, RgbColor } from "../Color/Color.interface";

export const rgbToHsv = (color: RgbColor): HsvColor => {
    const { r, g, b } = color;
    // Normalize RGB values to the range [0, 1]
    const red = r / 255;
    const green = g / 255;
    const blue = b / 255;

    // Find min and max values among the three channels
    const v = Math.max(red, green, blue);
    const min = Math.min(red, green, blue);
    const delta = v - min;

    const findHue = ({
        color,
        delta
    }: { color: RgbColor; delta: number }): number => {
        const { r, g, b } = color;
        if (delta === 0) {
            return 360
        } else if (v === r) {
            return ((60 * (((g - b) / delta) % 6)) + 360) % 360
        } else if (v === green) {
            return ((60 * ((b - r) / delta + 2)) + 360) % 360
        } else {
            return ((60 * ((r - g) / delta + 4)) + 360) % 360
        }
    }
    const h = findHue({ color, delta })
    const s = v === 0 ? 0 : delta / v

    return {
        h,
        s,
        v,
    };
}

export const rgbToHex = (color: RgbColor): string => {
    const { r, g, b } = color;
    return (
        "#" +
        [r, g, b]
            .map((x) => {
                const hex = x.toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            })
            .join("")
    )
}

export const hsvToRgb = (color: HsvColor): RgbColor => {
    const { h, s, v } = color
    
    const hue = (h % 360) / 60
    const chroma = v * s
    const x = chroma * (1 - Math.abs((hue % 2) - 1))
    const getRgbFromHueSector = (hue: number, chroma: number, x: number): RgbColor => {
        if (0 <= hue && hue < 1) {
            return { r: chroma, g: x, b: 0 }
        }
        else if (1 <= hue && hue < 2) {
            return { r: x, g: chroma, b: 0 }
        }
        else if (2 <= hue && hue < 3) {
            return { r: 0, g: chroma, b: x }
        }
        else if (3 <= hue && hue < 4) {
            return { r: 0, g: x, b: chroma }
        }
        else if (4 <= hue && hue < 5) {
            return { r: x, g: 0, b: chroma }
        }
        else if (5 <= hue && hue < 6) {
            return { r: chroma, g: 0, b: x }
        }
        else {
            return { r: 0, g: 0, b: 0 }
        }
    }
    const { r, g, b } = getRgbFromHueSector(hue, chroma, x)
    const m = v - chroma;
    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
    };
}

export const hexToRgb = (hex: string): RgbColor | null => {
    const getSanitizedHex = (hex: string): string => {
        const sanitizedHex = hex.replace(/^#/, '')
        if (sanitizedHex.length === 3) {
            return sanitizedHex.split('').map(char => char + char).join('');
        }
        else {
            return sanitizedHex;
        }
    }
    const sanitizedHex = getSanitizedHex(hex);
    if(sanitizedHex.length !== 6) {
        return null;
    }
    else {
        return {
            r: parseInt(sanitizedHex.slice(0, 2), 16),
            g: parseInt(sanitizedHex.slice(2, 4), 16),
            b: parseInt(sanitizedHex.slice(4, 6), 16),
        }
    }
}

export const hexToHsv = (hex: string): HsvColor | null => {
    const rgb = hexToRgb(hex);
    if (!rgb) {
        return null
    }
    else {
        return rgbToHsv(rgb);
    }
}
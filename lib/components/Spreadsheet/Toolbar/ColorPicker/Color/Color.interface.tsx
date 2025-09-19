export interface RgbColor {
    r: number,
    g: number,
    b: number,
}

export interface HsvColor {
    h: number,
    s: number,
    v: number,
}

export interface Color {
    rgb: RgbColor,
    hsv: HsvColor,
    hex: string,
    opacity: number,
}
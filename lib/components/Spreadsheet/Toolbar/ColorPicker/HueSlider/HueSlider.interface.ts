import type { Color } from "../Color/Color.interface";

export interface HueSliderProps {
    currentColor: Color,
    setCurrentColor: React.Dispatch<React.SetStateAction<Color>>,
}
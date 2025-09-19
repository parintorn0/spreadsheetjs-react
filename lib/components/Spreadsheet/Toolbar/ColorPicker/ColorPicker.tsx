import Class from "./ColorPicker.module.css"
import { useEffect, useState, useTransition } from "react"
import type { Color, HsvColor, RgbColor } from "./Color/Color.interface"
import { hexToRgb, hsvToRgb, rgbToHex, rgbToHsv } from "./Utils/conversion"
import HueSlider from "./HueSlider/HueSlider"

const ColorPicker = ({
    rgb = { r: 0, g: 0, b: 0 },
    hsv = { h: 0, s: 0, v: 0 },
    hex = "#000000",
    opacity = 1,
    onChange = (_: Color) => {},
}: {
    rgb?: RgbColor,
    hsv?: HsvColor,
    hex?: string,
    opacity?: number,
    onChange?: (color: Color) => void,
}) => {
    const defaultColor = {
        rgb: { r: 0, g: 0, b: 0 },
        hsv: { h: 0, s: 0, v: 0 },
        hex: "#000000",
        opacity: 1,
    }

    useEffect(() => {
        startSettingColor(() => {
            if((
                rgb !== undefined && hsv !== undefined
            ) || (
                rgb !== undefined && hex === undefined
            ) || (
                hsv !== undefined && hex === undefined
            )
            ) {
                console.error("ColorPicker: Please provide only one of rgb, hsv, or hex props.")
            }
            else {
                if (hex !== undefined) {
                    const rgb = hexToRgb(hex) || { r: 0, g: 0, b: 0 }
                    setCurrentColor({
                        rgb,
                        hsv: rgbToHsv(rgb),
                        hex: hex,
                        opacity: opacity,
                    })
                }
                else if (rgb !== undefined) {
                    setCurrentColor({
                        rgb: rgb,
                        hsv: rgbToHsv(rgb),
                        hex: `#${rgbToHex(rgb)}`,
                        opacity: opacity,
                    })
                }
                else if (hsv !== undefined) {
                    setCurrentColor({
                        rgb: hsvToRgb(hsv),
                        hsv: hsv,
                        hex: `#${rgbToHex(hsvToRgb(hsv))}`,
                        opacity: opacity,
                    })
                }
                else {
                    setCurrentColor(defaultColor)
                }
            }
        })
    }, [])

    const [currentColor, setCurrentColor] = useState<Color>(defaultColor)
    const [isSettingColor, startSettingColor] = useTransition()

    useEffect(() => {
        if(currentColor) {
            onChange(currentColor)
        }
    }, [currentColor])

    return (
        <div className={Class.colorPicker}>
            <div className="color-options">
                {Array.from({ length: 256 }, (_, i) => i).map((value) => (
                    <div
                    key={value}
                    className="color-option"
                    style={{ backgroundColor: `rgba(${value}, ${value}, ${value}, 1)` }}
                    />
                ))}
            </div>
            {!isSettingColor && (
                <HueSlider currentColor={currentColor} setCurrentColor={setCurrentColor} />
            )}
        </div>
    )
}

export default ColorPicker
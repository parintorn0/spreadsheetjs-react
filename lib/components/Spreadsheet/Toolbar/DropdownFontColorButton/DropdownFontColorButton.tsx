import Class from "./DropdownFontColorButton.module.css"
import { useState } from "react"
import DropdownButton from "../DropdownButton/DropdownButton"
import type { DropdownFontColorButtonProps } from "./DropdownFontColorButton.interface"
import ColorPicker from "@rc-component/color-picker"
import { setFontColor } from "../Toolbar.util"
import Button from "../Button/Button"
import { FontColor } from "../../../../assets/icons/Icon"

interface Color {
    r: number,
    g: number,
    b: number,
    a: number,
}

{/* Will migrate to ColorPicker component soon */}
const DropdownFontColorButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: DropdownFontColorButtonProps) => {
    const [color, setColor] = useState<Color>({r:0, g:0, b:0, a:1})
    const [hex, setHex] = useState<string>("#000")
    return (
            <DropdownButton
            button={(
                <Button
                onClick={() => {
                    setFontColor({
                        spreadsheetData,
                        onChange,
                        selectedCells,
                        color
                    })
                }}
                >
                    <div
                    className={Class.fontColor}
                    >
                        <FontColor
                        width={16}
                        height={16}
                        />
                        <div
                        style={{
                            backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                        }}
                        className={Class.colorStatus}
                        />
                    </div>
                </Button>
            )}
            >
                <div
                    className={Class.container}
                >
                    <ColorPicker
                        value={color}
                        onChange={(value) => {
                            const {r, g, b, a} = value.toRgb()
                            setColor({
                                r,
                                g,
                                b,
                                a,
                            })
                            setHex(value.toHexString())
                        }}
                        style={{
                            boxShadow: "none",
                            borderRadius: "0",
                        }}
                    />
                    <input
                        className={Class.hex}
                        type="text"
                        value={hex}
                        onChange={(e) => {
                            setHex(e.target.value)
                            const toHexEightDegit = (hexActualValue: string) => {
                                if(hexActualValue.length === 3) {
                                    return `${
                                        hexActualValue.split('').map((char: string) => char + char).join('')
                                    }ff`
                                }
                                else if(hexActualValue.length === 6) {
                                    return `${hexActualValue}ff`
                                }
                                else if(hexActualValue.length === 8) {
                                    return hexActualValue
                                }
                            }
                            const hexValue = toHexEightDegit(e.target.value.replace('#', ''))
                            if(hexValue) {
                                setColor({
                                    r: parseInt(hexValue.substring(0, 2), 16),
                                    g: parseInt(hexValue.substring(2, 4), 16),
                                    b: parseInt(hexValue.substring(4, 6), 16),
                                    a: parseInt(hexValue.substring(6, 8), 16) / 255,
                                })
                            }
                        }}
                    />
                </div>
            </DropdownButton>
    )
}

export default DropdownFontColorButton

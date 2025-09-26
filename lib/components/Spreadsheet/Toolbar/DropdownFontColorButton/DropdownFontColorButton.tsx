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
                    <FontColor />
                </Button>
            )}
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

                    }}
                />
            </DropdownButton>
    )
}

export default DropdownFontColorButton
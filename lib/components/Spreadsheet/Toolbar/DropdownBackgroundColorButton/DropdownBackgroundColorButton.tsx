import { useState } from "react"
import DropdownButton from "../DropdownButton/DropdownButton"
import type { DropdownBackgroundColorButtonProps } from "./DropdownBackgroundColorButton.interface"
import { SketchPicker } from "react-color"
import { setBackgroundColor } from "../Toolbar.util"
import Button from "../Button/Button"
import { BackgroundColor } from "../../../../assets/icons/Icon"

interface Color {
    r: number,
    g: number,
    b: number,
    a: number,
}

{/* Will migrate to ColorPicker component soon */}
const DropdownBackgroundColorButton = ({
    spreadsheetData,
    onChange,
    selectedCells
}: DropdownBackgroundColorButtonProps) => {
    const [color, setColor] = useState<Color>({r:0, g:0, b:0, a:1})
    return (
            <DropdownButton
            button={(
                <Button
                onClick={() => {
                    setBackgroundColor({
                        spreadsheetData,
                        onChange,
                        selectedCells,
                        color
                    })
                }}
                >
                    <BackgroundColor />
                </Button>
            )}
            >
                <SketchPicker
                    color={color}
                    onChange={(updatedColor) => {
                        setColor({
                            ...updatedColor.rgb,
                            a: updatedColor.rgb.a ?? 1,
                        })

                    }}
                    // onMouseUp={() => {}}
                />
            </DropdownButton>
    )
}

export default DropdownBackgroundColorButton
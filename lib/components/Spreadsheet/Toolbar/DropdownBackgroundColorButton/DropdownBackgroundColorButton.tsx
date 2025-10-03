import Class from "./DropdownBackgroundColorButton.module.css"
import { useState } from "react"
import DropdownButton from "../DropdownButton/DropdownButton"
import type { DropdownBackgroundColorButtonProps } from "./DropdownBackgroundColorButton.interface"
import ColorPicker from "@rc-component/color-picker"
import { setBackgroundColor } from "../Toolbar.util"
import Button from "../Button/Button"
import { BackgroundColor } from "../../../../assets/icons/Icon"
import '@rc-component/color-picker/assets/index.css';

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
                    <div
                        className={Class.bgColor}
                    >
                        <BackgroundColor
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
                    // onMouseUp={() => {}}
                />
            </DropdownButton>
    )
}

export default DropdownBackgroundColorButton
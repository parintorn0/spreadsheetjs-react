import Class from "./DropdownBorderButton.module.css"
import { SketchPicker } from "react-color"
import Button from "../Button/Button"
import DropdownButton from "../DropdownButton/DropdownButton"
import type { DropdownBorderButtonProps } from "./DropdownBorderButton.interface"
import { useState } from "react"
import { BorderAll, BorderBottom, BorderDashed, BorderDotted, BorderInside, BorderLeft, BorderNone, BorderOutside, BorderRight, BorderSolid, BorderTop } from "../../../../assets/icons/Icon"
import { setBorder } from "../Toolbar.util"

const DropdownBorderButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: DropdownBorderButtonProps) => {
    
    const borderTypeOptions = [
        { name: "top", icon: <BorderTop /> },
        { name: "bottom", icon: <BorderBottom /> },
        { name: "left", icon: <BorderLeft /> },
        { name: "right", icon: <BorderRight /> },
        { name: "all", icon: <BorderAll /> },
        { name: "inside", icon: <BorderInside /> },
        { name: "outside", icon: <BorderOutside /> },
        { name: "none", icon: <BorderNone /> },
    ]

    const borderStyleOptions = [
        {
            name: "solid",
            icon : (
                <BorderSolid
                    height={6}
                />
            )
        },
        {
            name: "dotted",
            icon : (
                <BorderDotted
                    height={6}
                />
            )
        },
        {
            name: "dashed",
            icon : (
                <BorderDashed
                    height={6}
                />
            )
        }
    ]

    const [borderTypeComponent, setBorderTypeComponent] = useState(<BorderTop />)
    const [borderStyleComponent, setBorderStyleComponent] = useState(
        <BorderSolid
            height={6}
        />
    )
    const [borderType, setBorderType] = useState<"top" | "bottom" | "left" | "right" | "all" | "inside" | "outside" | "none">("top")
    const [borderWidth, setBorderWidth] = useState<number>(1)
    const [borderStyle, setBorderStyle] = useState<"solid" | "dashed" | "dotted">("solid")
    const [borderColor, setBorderColor] = useState<{r: number, g: number, b: number, a: number}>({r:0, g:0, b:0, a:1})

    return (
            <DropdownButton
            button={(
                <Button
                onClick={()=>{
                    setBorder({
                        spreadsheetData,
                        onChange,
                        selectedCells,
                        borderType,
                        borderWidth,
                        borderStyle,
                        borderColor: {
                            r: borderColor.r,
                            g: borderColor.g,
                            b: borderColor.b,
                            a: borderColor.a,
                        },
                    })
                }}
                >
                    {borderTypeComponent}
                </Button>
            )}
            >
                <div className={Class.container}>
                    <div className={Class.borderAllOptions}>
                        <div className={Class.borderOptions}>
                            {borderTypeOptions.slice(0, 4).map((option) => (
                                <Button
                                key={option.name}
                                onClick={() => {
                                    setBorderTypeComponent(option.icon)
                                    setBorderType(option.name as "top" | "bottom" | "left" | "right" | "all" | "inside" | "outside" | "none")
                                    setBorder({
                                        spreadsheetData,
                                        onChange,
                                        selectedCells,
                                        borderType: option.name as "top" | "bottom" | "left" | "right" | "all" | "inside" | "outside" | "none",
                                        borderWidth,
                                        borderStyle,
                                        borderColor,
                                    })
                                }}
                                >
                                    {option.icon}
                                </Button>
                            ))}
                        </div>
                        <div className={Class.borderOptions}>
                            {borderTypeOptions.slice(4).map((option) => (
                                <Button
                                key={option.name}
                                onClick={() => {
                                    setBorderTypeComponent(option.icon)
                                    setBorderType(option.name as "top" | "bottom" | "left" | "right" | "all" | "inside" | "outside" | "none")
                                    setBorder({
                                        spreadsheetData,
                                        onChange,
                                        selectedCells,
                                        borderType: option.name as "top" | "bottom" | "left" | "right" | "all" | "inside" | "outside" | "none",
                                        borderWidth,
                                        borderStyle,
                                        borderColor,
                                    })
                                }}
                                >
                                    {option.icon}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <DropdownButton
                            button={(
                                <div className={Class.borderStyle}>
                                    {borderStyleComponent}
                                </div>
                            )}
                            allowButtonOpen={true}
                        >
                            <div>
                                {borderStyleOptions.map((option) => (
                                    <Button
                                    key={option.name}
                                    onClick={() => {
                                        setBorderStyleComponent(option.icon)
                                        setBorderStyle(option.name as "solid" | "dashed" | "dotted")
                                    }}
                                    >
                                        {option.icon}
                                    </Button>
                                ))}
                            </div>
                        </DropdownButton>
                    </div>
                    <div className={Class.borderWidthContainer}>
                        <DropdownButton
                            button={(
                                <div className={Class.color}>
                                    <div className={Class.colorPreview} style={{
                                        backgroundColor: `rgba(${borderColor.r}, ${borderColor.g}, ${borderColor.b}, ${borderColor.a})`,
                                    }} />
                                </div>
                            )}
                            allowButtonOpen={true}
                        >
                            <div>
                                <SketchPicker
                                    color={borderColor}
                                    onChange={(updatedColor) => {
                                        setBorderColor({
                                            ...updatedColor.rgb,
                                            a: updatedColor.rgb.a ?? 1,
                                        })

                                    }}
                                />
                            </div>
                        </DropdownButton>
                        <input
                        className={Class.input}
                        type="number"
                        min={1}
                        step={1}
                        value={borderWidth}
                        onChange={(e) => setBorderWidth(Number(e.target.value))}
                        />px
                    </div>
                </div>
            </DropdownButton>
    )
}

export default DropdownBorderButton
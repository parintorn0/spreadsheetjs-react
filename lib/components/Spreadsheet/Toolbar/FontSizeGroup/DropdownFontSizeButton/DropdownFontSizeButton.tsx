import Class from "./DropdownFontSizeButton.module.css"
import DropDownButton from "../../DropdownButton/DropdownButton"
import { useEffect, useState } from "react"
import { setFontSize } from "../../Toolbar.util"
import { FontSize } from "../../../../../assets/icons/Icon"
import type { DropdownFontSizeButtonProps } from "./DropdownFontSizeButton.interface"

const DropdownFontSizeButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    draggingStartCell,
}: DropdownFontSizeButtonProps) => {

    const [fontSizeValue, setFontSizeValue] = useState<number>(14)

    const valueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFontSizeValue(Number(e.target.value))
        setFontSize({
            spreadsheetData,
            onChange,
            selectedCells,
            fontSize: Number(e.target.value),
        })
    }

    useEffect(()=>{
        setFontSizeValue(spreadsheetData.cells[draggingStartCell.y]?.[draggingStartCell.x]?.style?.font_size ?? 14)
    }, [draggingStartCell, spreadsheetData])

    return (
        <DropDownButton
        button={(
            <FontSize />
        )}
        allowButtonOpen
        >
            <input
            className={Class.input}
            type="number"
            min={8}
            max={72}
            step={1}
            value={fontSizeValue}
            onChange={valueChanged}
            /> px
        </DropDownButton>
    )
}

export default DropdownFontSizeButton
import Class from "./FontSizeGroup.module.css"
import type { FontSizeGroupProps } from "./FontSizeGroup.interface"
import FontSizeUp from "./FontSizeUp/FontSizeUp"
import FontSizeDown from "./FontSizeDown/FontSizeDown"
import DropdownFontSizeButton from "./DropdownFontSizeButton/DropdownFontSizeButton"

const FontSizeGroup = ({
    spreadsheetData,
    onChange,
    selectedCells,
    draggingStartCell,
}: FontSizeGroupProps) => {

    return (
        <div className={Class.fontSizeGroup}>
            <DropdownFontSizeButton
            spreadsheetData={spreadsheetData}
            onChange={onChange}
            selectedCells={selectedCells}
            draggingStartCell={draggingStartCell}
            />
            <FontSizeDown
                spreadsheetData={spreadsheetData}
                onChange={onChange}
                selectedCells={selectedCells}
            />
            <FontSizeUp
                spreadsheetData={spreadsheetData}
                onChange={onChange}
                selectedCells={selectedCells}
            />
        </div>
    )
}

export default FontSizeGroup
import type { SpreadsheetData, SelectedCells, Coordinate } from "../../../Spreadsheet.interface"

export interface DropdownFontSizeButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
    draggingStartCell: Coordinate,
}
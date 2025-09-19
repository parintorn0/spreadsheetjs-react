import type { SpreadsheetData, SelectedCells } from "../../Spreadsheet.interface"

export interface DropdownFontColorButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}
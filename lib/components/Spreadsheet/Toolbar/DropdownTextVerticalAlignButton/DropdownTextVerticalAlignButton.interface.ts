import type { SpreadsheetData, SelectedCells } from "../../Spreadsheet.interface"

export interface DropdownTextVerticalAlignButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}
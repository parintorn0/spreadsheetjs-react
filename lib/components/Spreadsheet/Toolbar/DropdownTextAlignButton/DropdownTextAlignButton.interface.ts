import type { SpreadsheetData, SelectedCells } from "../../Spreadsheet.interface"

export interface DropdownTextAlignButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}
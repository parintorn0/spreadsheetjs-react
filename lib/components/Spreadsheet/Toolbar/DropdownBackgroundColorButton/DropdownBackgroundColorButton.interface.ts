import type { SelectedCells, SpreadsheetData } from "../../Spreadsheet.interface";

export interface DropdownBackgroundColorButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}
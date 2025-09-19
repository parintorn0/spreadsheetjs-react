import type { SelectedCells, SpreadsheetData } from "../../Spreadsheet.interface";

export interface DropdownBorderButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}
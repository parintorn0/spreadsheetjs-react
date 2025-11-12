import type { SelectedCells, SpreadsheetData } from "../../Spreadsheet.interface";

export interface RotateGroupProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}

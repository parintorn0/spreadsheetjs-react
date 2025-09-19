import type { SelectedCells, SpreadsheetData } from "../../../Spreadsheet.interface";

export interface FontSizeDownProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}
import type { SelectedCells, SpreadsheetData } from "../../../Spreadsheet.interface";

export interface FontSizeUpProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}
import type { SelectedCells, SpreadsheetData } from "../Spreadsheet.interface";

export interface ToolbarProps {
    spreadsheetData: SpreadsheetData,
    setSpreadsheetData: React.Dispatch<React.SetStateAction<SpreadsheetData>>
    selectedCells: SelectedCells,
}
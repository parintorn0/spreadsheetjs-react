import type { SelectedCells, SpreadsheetData } from "../../../Spreadsheet.interface";

export interface RotateClockwiseButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}

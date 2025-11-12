import type { SelectedCells, SpreadsheetData } from "../../../Spreadsheet.interface";

export interface RotateAntiClockwiseButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}

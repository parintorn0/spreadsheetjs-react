import type { Coordinate, SelectedCells, SpreadsheetData } from "../../Spreadsheet.interface";

export interface BoldButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
    draggingStartCell: Coordinate,
}
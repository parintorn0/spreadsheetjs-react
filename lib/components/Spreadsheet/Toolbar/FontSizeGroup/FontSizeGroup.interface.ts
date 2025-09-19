import type { Coordinate, SelectedCells, SpreadsheetData } from "../../Spreadsheet.interface";

export interface FontSizeGroupProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
    draggingStartCell: Coordinate,
}
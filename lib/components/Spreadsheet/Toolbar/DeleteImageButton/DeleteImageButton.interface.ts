import type { Coordinate, SpreadsheetData } from "../../Spreadsheet.interface";

export interface DeleteImageButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    draggingStartCell: Coordinate,
}
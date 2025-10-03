import type { Coordinate, SpreadsheetData } from "../../Spreadsheet.interface";

export interface InsertImageButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    draggingStartCell: Coordinate,
}
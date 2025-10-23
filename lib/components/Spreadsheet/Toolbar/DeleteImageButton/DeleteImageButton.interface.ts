import type {SelectedCells, SpreadsheetData} from "../../Spreadsheet.interface";

export interface DeleteImageButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}
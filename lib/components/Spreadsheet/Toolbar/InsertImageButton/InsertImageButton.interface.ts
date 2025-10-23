import type {Image, SelectedCells, SpreadsheetData} from "../../Spreadsheet.interface";

export interface InsertImageButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    selectedCells: SelectedCells,
    preAddImage?: (blob: Blob) => Promise<Image | null>,
}
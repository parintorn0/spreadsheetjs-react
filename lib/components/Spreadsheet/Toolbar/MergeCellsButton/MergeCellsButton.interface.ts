import type { Coordinate, SelectedCells, SpreadsheetData } from "../../Spreadsheet.interface";

export interface MergeCellsButtonProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    selectedCells: SelectedCells,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
}
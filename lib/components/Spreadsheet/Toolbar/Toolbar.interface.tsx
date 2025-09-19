import type { Coordinate, SelectedCells, SpreadsheetData } from "../Spreadsheet.interface";

export interface ToolbarProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    selectedCells: SelectedCells,
    draggingStartCell: Coordinate,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
}
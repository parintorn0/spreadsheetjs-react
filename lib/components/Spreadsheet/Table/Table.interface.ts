import type { Coordinate, SelectedCells, SpreadsheetData } from "../Spreadsheet.interface";

export interface TableProps {
    spreadsheetData: SpreadsheetData,
    setSpreadsheetData: React.Dispatch<React.SetStateAction<SpreadsheetData>>
    editingCell: Coordinate | null,
    setEditingCell: React.Dispatch<React.SetStateAction<Coordinate | null>>,
    isDragging: boolean,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    draggingStartCell: Coordinate,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
}
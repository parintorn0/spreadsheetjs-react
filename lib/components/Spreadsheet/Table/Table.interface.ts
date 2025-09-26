import type { Coordinate, SelectedCells, SpreadsheetData } from "../Spreadsheet.interface";

export interface TableProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    editingCell: Coordinate | null,
    setEditingCell: React.Dispatch<React.SetStateAction<Coordinate | null>>,
    isDragging: boolean,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    draggingStartCell: Coordinate,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
    overrideResizeColumnPrompt?: () => Promise<number | null>,
    overrideResizeRowPrompt?: () => Promise<number | null>,
}
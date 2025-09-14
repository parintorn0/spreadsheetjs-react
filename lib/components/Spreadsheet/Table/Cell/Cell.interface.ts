import type { CellData, Coordinate, SelectedCells, SpreadsheetData } from "../../Spreadsheet.interface"

export interface CellProps {
    cell: CellData,
    coordinate: Coordinate,
    cells: Array<Array<CellData>>,
    editingCell: Coordinate | null,
    setEditingCell: React.Dispatch<React.SetStateAction<Coordinate | null>>,
    setSpreadsheetData: React.Dispatch<React.SetStateAction<SpreadsheetData>>,
    isDragging: boolean,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    draggingStartCell: Coordinate,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
    height: number,
    width: number,
}
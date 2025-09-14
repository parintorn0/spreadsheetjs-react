import type { CellData, Coordinate, SelectedCells } from "../Spreadsheet.interface";

interface StartDraggingPropsStructure {
    cells: Array<Array<CellData>>,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
}

export interface StartDraggingProps extends StartDraggingPropsStructure {
    selectedCells: SelectedCells,
}
export interface AllStartDraggingProps extends StartDraggingPropsStructure {}
export interface ColumnStartDraggingProps extends StartDraggingPropsStructure {
    columnIndex: number,
}
export interface RowStartDraggingProps extends StartDraggingPropsStructure {
    rowIndex: number,
}

interface DraggingPropsStructure {
    cells: Array<Array<CellData>>,
    isDragging: boolean,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
}
export interface DraggingProps extends DraggingPropsStructure {
    selectedCells: SelectedCells,
}
export interface AllDraggingProps extends DraggingPropsStructure {}
export interface ColumnDraggingProps extends DraggingPropsStructure {
    columnIndex: number,
    draggingStartCell: Coordinate,
}
export interface RowDraggingProps extends DraggingPropsStructure {
    rowIndex: number,
    draggingStartCell: Coordinate,
}
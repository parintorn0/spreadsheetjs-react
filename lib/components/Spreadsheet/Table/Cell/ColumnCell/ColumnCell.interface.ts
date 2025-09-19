import type { CellData, Coordinate, SelectedCells, SpreadsheetData } from "../../../Spreadsheet.interface";

export interface ColumnCellProps {
    columnIndex: number,
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    isDragging: boolean,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    draggingStartCell: Coordinate,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
    cells: Array<Array<CellData>>,
    edgeThreshold: number,
    contextMenuRef: React.RefObject<HTMLDivElement>,
    setIsContextMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface ResizingColumn {
    x: number,
    startX: number,
    startWidth: number,
}
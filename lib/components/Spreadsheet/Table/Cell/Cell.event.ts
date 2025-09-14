import type { CellData, Coordinate, SelectedCells, SpreadsheetData } from "../../Spreadsheet.interface";
import { findSelection, isSameCoordinate } from "../../Spreadsheet.util";

interface CellDoubleClickProps {
    setEditingCell: React.Dispatch<React.SetStateAction<Coordinate | null>>,
    coordinate: Coordinate,
}

export const cellDoubleClick = ({
    setEditingCell,
    coordinate,
}: CellDoubleClickProps): void => {
    setEditingCell(coordinate)
}

interface CellValueChangedProps {
    value: string,
    setSpreadsheetData: React.Dispatch<React.SetStateAction<SpreadsheetData>>,
    coordinate: Coordinate
}

export const cellValueChanged = ({
    value,
    setSpreadsheetData,
    coordinate,
}: CellValueChangedProps) => {
    setSpreadsheetData(prev=>({
        ...prev,
        cells: prev.cells.map((row, rowIndex) => (
            row.map((col, colIndex) => {
                const currentCoordinate = {
                    x: colIndex,
                    y: rowIndex,
                }
                return isSameCoordinate(currentCoordinate, coordinate) ? {
                    ...col,
                    value,
                } : col
            })
        ))
    }))
}

interface CellStartDraggingProps {
    e: React.MouseEvent<HTMLTableCellElement, MouseEvent>,
    editingCell: Coordinate | null,
    coordinate: Coordinate,
    cells: Array<Array<CellData>>,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
}

export const cellStartDragging = ({
    e,
    editingCell,
    coordinate,
    cells,
    setIsDragging,
    setDraggingStartCell,
    setSelectedCells,
}: CellStartDraggingProps): void => {
    if(isSameCoordinate(coordinate, editingCell)) {
        e.preventDefault()
    }
    const selection = findSelection({
        selectedCells: {
            start: coordinate,
            end: coordinate,
        },
        cells,
    })
    setIsDragging(true)
    setDraggingStartCell(selection.start)
    setSelectedCells(selection)
}

interface CellDraggingProps {
    coordinate: Coordinate,
    cells: Array<Array<CellData>>,
    isDragging: boolean,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
    draggingStartCell: Coordinate,
}

export const cellDragging = ({
    coordinate,
    cells,
    isDragging,
    setSelectedCells,
    draggingStartCell,
}: CellDraggingProps): void => {
    if (isDragging) {
        setSelectedCells(findSelection({
            selectedCells: {
                start: {
                    x: Math.min(coordinate.x, draggingStartCell.x),
                    y: Math.min(coordinate.y, draggingStartCell.y),
                },
                end: {
                    x: Math.max(coordinate.x, draggingStartCell.x),
                    y: Math.max(coordinate.y, draggingStartCell.y),
                },
            },
            cells,
        }))
    }
}

export const cellStopDragging = ({
    setIsDragging,
}: {
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
}): void => {
    setIsDragging(false)
}
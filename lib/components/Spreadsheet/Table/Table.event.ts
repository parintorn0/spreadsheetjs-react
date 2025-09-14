import { findSelection } from "../Spreadsheet.util";

import { type AllDraggingProps, type AllStartDraggingProps, type ColumnDraggingProps, type ColumnStartDraggingProps, type DraggingProps, type RowDraggingProps, type RowStartDraggingProps, type StartDraggingProps } from "./Table.event.interface"

const startDragging = ({
    selectedCells,
    cells,
    setIsDragging,
    setDraggingStartCell,
    setSelectedCells,
}: StartDraggingProps) => {
    const selection = findSelection({
        selectedCells,
        cells,
    })
    setIsDragging(true)
    setDraggingStartCell(selection.start)
    setSelectedCells(selection)
}

export const allStartDragging = ({
    cells,
    setIsDragging,
    setDraggingStartCell,
    setSelectedCells,
}: AllStartDraggingProps): void => {
    startDragging({
        selectedCells: {
            start: {
                x: 0,
                y: 0,
            },
            end: {
                x: cells[0].length,
                y: cells.length,
            },
        },
        cells,
        setIsDragging,
        setDraggingStartCell,
        setSelectedCells,
    })
}

export const columnStartDragging = ({
    columnIndex,
    cells,
    setIsDragging,
    setDraggingStartCell,
    setSelectedCells,
}: ColumnStartDraggingProps): void => {
    startDragging({
        selectedCells: {
            start: {
                x: columnIndex,
                y: 0,
            },
            end: {
                x: columnIndex,
                y: cells.length,
            },
        },
        cells,
        setIsDragging,
        setDraggingStartCell,
        setSelectedCells,
    })
}

export const rowStartDragging = ({
    rowIndex,
    cells,
    setIsDragging,
    setDraggingStartCell,
    setSelectedCells,
}: RowStartDraggingProps): void => {
    startDragging({
        selectedCells: {
            start: {
                x: 0,
                y: rowIndex,
            },
            end: {
                x: cells[0].length,
                y: rowIndex,
            },
        },
        cells,
        setIsDragging,
        setDraggingStartCell,
        setSelectedCells,
    })
}

const dragging = ({
    selectedCells,
    cells,
    isDragging,
    setSelectedCells,
}: DraggingProps) => {
    if (isDragging) {
        setSelectedCells(findSelection({
            selectedCells,
            cells,
        }))
    }
}

export const allDragging = ({
    cells,
    isDragging,
    setSelectedCells,
}: AllDraggingProps) => {
    dragging({
        selectedCells: {
            start: {
                x: 0,
                y: 0,
            },
            end: {
                x: cells[0].length,
                y: cells.length,
            },
        },
        cells,
        isDragging,
        setSelectedCells,
    })
}

export const columnDragging = ({
    columnIndex,
    cells,
    isDragging,
    setSelectedCells,
    draggingStartCell,
}: ColumnDraggingProps) => {
    dragging({
        selectedCells: {
            start: {
                x: Math.min(columnIndex, draggingStartCell.x),
                y: 0,
            },
            end: {
                x: Math.max(columnIndex, draggingStartCell.x),
                y: cells.length,
            },
        },
        cells,
        isDragging,
        setSelectedCells,
    })
}

export const rowDragging = ({
    rowIndex,
    cells,
    isDragging,
    setSelectedCells,
    draggingStartCell,
}: RowDraggingProps) => {
    dragging({
        selectedCells: {
            start: {
                x: 0,
                y: Math.min(rowIndex, draggingStartCell.y),
            },
            end: {
                x: cells[0].length,
                y: Math.max(rowIndex, draggingStartCell.y),
            },
        },
        cells,
        isDragging,
        setSelectedCells,
    })
}
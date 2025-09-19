import { dragging, startDragging } from "../../Table.event"
import type { ColumnDraggingProps, ColumnStartDraggingProps } from "./ColumnCell.event.interface"

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
                y: cells.length - 1,
            },
        },
        cells,
        setIsDragging,
        setDraggingStartCell,
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
                y: cells.length - 1,
            },
        },
        cells,
        isDragging,
        setSelectedCells,
    })
}
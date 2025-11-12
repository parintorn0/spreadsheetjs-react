import { dragging, startDragging } from "../../Table.event"
import type { ColumnDraggingProps, ColumnStartDraggingProps } from "./ColumnCell.event.interface"

export const columnStartDragging = ({
    columnIndex,
    cells,
    mergedCells,
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
        mergedCells,
        setIsDragging,
        setDraggingStartCell,
        setSelectedCells,
    })
}


export const columnDragging = ({
    columnIndex,
    cells,
    mergedCells,
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
        mergedCells,
        isDragging,
        setSelectedCells,
    })
}

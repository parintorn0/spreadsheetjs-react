import { dragging, startDragging } from "../../Table.event"
import type { RowDraggingProps, RowStartDraggingProps } from "./RowCell.event.interface"

export const rowStartDragging = ({
    rowIndex,
    cells,
    mergedCells,
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
                x: cells[0].length - 1,
                y: rowIndex,
            },
        },
        cells,
        mergedCells,
        setIsDragging,
        setDraggingStartCell,
        setSelectedCells,
    })
}

export const rowDragging = ({
    rowIndex,
    cells,
    mergedCells,
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
                x: cells[0].length - 1,
                y: Math.max(rowIndex, draggingStartCell.y),
            },
        },
        cells,
        mergedCells,
        isDragging,
        setSelectedCells,
    })
}

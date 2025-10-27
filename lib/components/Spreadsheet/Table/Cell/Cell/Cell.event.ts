import { findSelection, isSameCoordinate } from "../../../Spreadsheet.util";
import type { CellDoubleClickProps, CellDraggingProps, CellStartDraggingProps, CellValueChangedProps } from "./Cell.event.interface";

export const cellDoubleClick = ({
    setEditingCell,
    coordinate,
}: CellDoubleClickProps): void => {
    setEditingCell(coordinate)
}

export const cellValueChanged = ({
    value,
    image,
    spreadsheetData,
    onChange,
    coordinate,
}: CellValueChangedProps) => {
    onChange({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map((row, rowIndex) => (
            row.map((col, colIndex) => {
                const currentCoordinate = {
                    x: colIndex,
                    y: rowIndex,
                }
                if (isSameCoordinate(currentCoordinate, coordinate)) {
                    if (col.image?.path?.startsWith('blob://')) {
                        URL.revokeObjectURL(col.image.path);
                    }
                    return {
                        ...col,
                        ...(value !== undefined && { value }),
                        ...(image && { image })
                    }
                }
                else {
                    return col
                }
            })
        ))
    })
}

export const cellStartDragging = ({
    coordinate,
    spreadsheetData,
    setIsDragging,
    setDraggingStartCell,
    setSelectedCells,
}: CellStartDraggingProps): void => {
    const selection = findSelection({
        selectedCells: {
            start: coordinate,
            end: coordinate,
        },
        cells: spreadsheetData.cells,
    })
    setIsDragging(true)
    setDraggingStartCell(selection.start)
    setSelectedCells(selection)
}

export const cellDragging = ({
    coordinate,
    spreadsheetData,
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
            cells: spreadsheetData.cells,
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

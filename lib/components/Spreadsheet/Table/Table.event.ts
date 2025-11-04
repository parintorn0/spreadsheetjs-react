import { findSelection } from "../Spreadsheet.util";

import type { AllDraggingProps, AllStartDraggingProps, DraggingProps, ResizeColumnProps, ResizeRowProps, StartDraggingProps } from "./Table.event.interface"

export const startDragging = ({
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
                x: cells[0].length - 1,
                y: cells.length - 1,
            },
        },
        cells,
        setIsDragging,
        setDraggingStartCell,
        setSelectedCells,
    })
}



export const dragging = ({
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
                x: cells[0].length - 1,
                y: cells.length - 1,
            },
        },
        cells,
        isDragging,
        setSelectedCells,
    })
}


export const resizeColumnPrompt = (): number | null => {
    const input = prompt("Enter new column width (in pixels):", "100")
    if(input) {
        const width = parseInt(input)
        if(width) {
            return width
        } else {
            alert("Invalid input.")
            return resizeColumnPrompt()
        }
    }
    else {
        return null
    }
}

export const resizeColumn = ({
    spreadsheetData,
    onChange,
    selectedCells,
    width
}: ResizeColumnProps) => {

    onChange({
        ...spreadsheetData,
        cols_width:[
            ...spreadsheetData.cols_width.slice(0, selectedCells.start.x),
            ...Array.from({length: selectedCells.end.x - selectedCells.start.x + 1}, () => width),
            ...spreadsheetData.cols_width.slice(selectedCells.end.x + 1),
        ],
    })
}

export const resizeRowPrompt = (): number | null => {
    const input = prompt("Enter new row height (in pixels):", "50")
    if(input) {
        const height = parseInt(input)
        if(height) {
            return height
        } else {
            alert("Invalid input.")
            return resizeRowPrompt()
        }
    }
    else {
        return null
    }
}

export const resizeRow = ({
    spreadsheetData,
    onChange,
    selectedCells,
    height,
}: ResizeRowProps) => {
    onChange({
        ...spreadsheetData,
        rows_height: [
            ...spreadsheetData.rows_height.slice(0, selectedCells.start.y),
            ...Array.from({ length: selectedCells.end.y - selectedCells.start.y + 1 }, () => height),
            ...spreadsheetData.rows_height.slice(selectedCells.end.y + 1),
        ],
    })
}

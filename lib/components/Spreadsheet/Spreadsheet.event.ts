import type { DeleteColumnProps, DeleteRowProps, InsertColumnProps, InsertRowProps } from "./Spreadsheet.event.interface"

export const insertRow = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
    after = false,
}: InsertRowProps) => {
    onChange({
        ...spreadsheetData,
        cells: [
            ...(
                after ? (
                    spreadsheetData.cells.slice(0, selectedCells.end.y + 1)
                ) : (
                    spreadsheetData.cells.slice(0, selectedCells.start.y)
                )
            ),
            spreadsheetData.cells[0].map(()=>({ value: "" })),
            ...(
                after ? (
                    spreadsheetData.cells.slice(selectedCells.end.y + 1, spreadsheetData.cells.length)
                ) : (
                    spreadsheetData.cells.slice(selectedCells.start.y, spreadsheetData.cells.length).map((
                        row
                    ) => row.map((
                        col
                    ) => (col.from ? { ...col, from: {
                        ...col.from,
                        y: col.from.y + 1,
                    } } : col)))
                )
            ),
        ],
        rows_height: [
            ...(
                after ? (
                    spreadsheetData.rows_height.slice(0, selectedCells.end.y + 1)
                ) : (
                    spreadsheetData.rows_height.slice(0, selectedCells.start.y)
                )
            ),
            50,
            ...(
                after ? (
                    spreadsheetData.rows_height.slice(selectedCells.end.y + 1, spreadsheetData.rows_height.length)
                ) : (
                    spreadsheetData.rows_height.slice(selectedCells.start.y, spreadsheetData.rows_height.length)
                )
            ),
        ],
    })
    if(!after) {
        setSelectedCells(spreadsheetData => ({
            start: {
                ...spreadsheetData.start,
                y: spreadsheetData.start.y + 1,
            },
            end: {
                ...spreadsheetData.end,
                y: spreadsheetData.end.y + 1,
            },
        }))
        setDraggingStartCell(spreadsheetData => ({
            ...spreadsheetData,
            y: spreadsheetData.y + 1,
        }))
    }
}

export const insertColumn = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
    after = false,
}: InsertColumnProps) => {
    onChange({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map(row => ([
            ...(
                after ? (
                    row.slice(0, selectedCells.end.x + 1)
                ) : (
                    row.slice(0, selectedCells.start.x)
                )
            ),
            { value: "" },
            ...(
                after ? (
                    row.slice(selectedCells.end.x + 1, row.length)
                ) : (
                    row.slice(selectedCells.start.x, row.length).map((
                        col
                    ) => (
                        col.from ? {
                            ...col,
                            from: {
                                ...col.from,
                                x: col.from.x + 1
                            }
                        } : col
                    ))
                )
            ),
        ])),
        cols_width: [
            ...(
                after ? (
                    spreadsheetData.cols_width.slice(0, selectedCells.end.x + 1)
                ) : (
                    spreadsheetData.cols_width.slice(0, selectedCells.start.x)
                )
            ),
            100,
            ...(
                after ? (
                    spreadsheetData.cols_width.slice(selectedCells.end.x + 1, spreadsheetData.cols_width.length)
                ) : (
                    spreadsheetData.cols_width.slice(selectedCells.start.x, spreadsheetData.cols_width.length)
                )
            ),
        ]
    })
    if(!after) {
        setSelectedCells(spreadsheetData => ({
            start: {
                ...spreadsheetData.start,
                x: spreadsheetData.start.x + 1,
            },
            end: {
                ...spreadsheetData.end,
                x: spreadsheetData.end.x + 1,
            },
        }))
        setDraggingStartCell(spreadsheetData => ({
            ...spreadsheetData,
            x: spreadsheetData.x + 1,
        }))
    }
}

export const deleteColumn = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
}: DeleteColumnProps) => {
    onChange({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map(row => row.length > 1 ? [
            ...row.slice(0, selectedCells.start.x),
            ...row.slice(selectedCells.end.x + 1, row.length),
        ] : row),
        cols_width: spreadsheetData.cols_width.length > 1 ? [
            ...spreadsheetData.cols_width.slice(0, selectedCells.start.x),
            ...spreadsheetData.cols_width.slice(selectedCells.end.x + 1, spreadsheetData.cols_width.length),
        ] : spreadsheetData.cols_width,
    })
    setSelectedCells(spreadsheetData => ({
        start: {
            x: Math.max(0, spreadsheetData.start.x - 1),
            y: selectedCells.start.y,
        },
        end: {
            x: Math.max(0, spreadsheetData.start.x - 1),
            y: selectedCells.start.y,
        },
    }))
    setDraggingStartCell(spreadsheetData => ({
        x: Math.max(0, spreadsheetData.x - 1),
        y: selectedCells.start.y,
    }))
}

export const deleteRow = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
}: DeleteRowProps) => {
    onChange({
        ...spreadsheetData,
        cells: [
            ...spreadsheetData.cells.slice(0, selectedCells.start.y),
            ...spreadsheetData.cells.slice(selectedCells.end.y + 1, spreadsheetData.cells.length),
        ],
        rows_height:[
            ...spreadsheetData.rows_height.slice(0, selectedCells.start.y),
            ...spreadsheetData.rows_height.slice(selectedCells.end.y + 1, spreadsheetData.rows_height.length),
        ],
    })
    setSelectedCells(spreadsheetData => ({
        start: {
            x: selectedCells.start.x,
            y: Math.max(0, spreadsheetData.start.y - 1),
        },
        end: {
            x: selectedCells.start.x,
            y: Math.max(0, spreadsheetData.start.y - 1),
        },
    }))
    setDraggingStartCell(spreadsheetData => ({
        x: selectedCells.start.x,
        y: Math.max(0, spreadsheetData.y - 1),
    }))
}

import Class from "./Spreadsheet.module.css"

import { useEffect, useState } from "react"
import type { Coordinate, SelectedCells, SpreadsheetProps } from "./Spreadsheet.interface"
import Toolbar from "./Toolbar/Toolbar"
import Table from "./Table/Table"
import { findSelection } from "./Spreadsheet.util"

const defaultSpreadsheetData = {
    cells: [[{
        value: "A1",
    }, {
        value: "B1",
    }, {
        value: "C1",
    }, {
        value: "D1",
    }], [{
        value: "A2",
    }, {
        value: "B2",
    }, {
        value: "C2",
    }, {
        value: "D2",
    }], [{
        value: "A3",
    }, {
        value: "B3",
    }, {
        value: "C3"
    }, {
        value: "D3"
    }], [{
        value: "A4",
    }, {
        value: "B4",
    }, {
        value: "C4",
    }, {
        value: "D4",
    }]],
    rows_height: [50, 50, 50, 50],
    cols_width: [100, 100, 100, 100],
    merged_cells: [],
}

const Spreadsheet = ({
    cells,
    rows_height,
    cols_width,
    merged_cells,
    viewOnlyMode = false,
    onChange,
    overrideResizeColumnPrompt,
    overrideResizeRowPrompt,
    appendCellMenu,
    appendRowCellMenu,
    appendColumnCellMenu,
    appendToolbar,
    preAddImage,
    disableDefaultToolbar,
    disableDefaultCellMenu,
    disableDefaultRowCellMenu,
    disableDefaultColumnCellMenu,
}: SpreadsheetProps) => {

    const [allRequiredPropProvided, setAllRequiredPropProvided] = useState<boolean | null>(null)

    useEffect(() => {
        if (cells && rows_height && cols_width) {
            if (cells.length !== rows_height.length || cells.every(row => row.length !== cols_width.length)) {
                setAllRequiredPropProvided(false)
                throw new Error("SpreadsheetJSReact: The length of rows_height must match the number of rows in cells, and the length of cols_width must match the number of columns in cells.")
            }
            else {
                setAllRequiredPropProvided(true)
            }
        }
        else if (!cells && !rows_height && !cols_width) {
            onChange(defaultSpreadsheetData)
            setAllRequiredPropProvided(true)
        }
        else {
            setAllRequiredPropProvided(false)
            throw new Error("SpreadsheetJSReact: If you provide any of cells, rows_height, or cols_width props, you must provide all three.")
        }
    }, [])

    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [draggingStartCell, setDraggingStartCell] = useState<Coordinate>({
        x: 0,
        y: 0,
    })
    const [selectedCells, setSelectedCells] = useState<SelectedCells>(findSelection({
        selectedCells: {
            start: {
                x: 0,
                y: 0,
            },
            end: {
                x: 0,
                y: 0,
            }
        },
        mergedCells: merged_cells,
    }))
    const [editingCell, setEditingCell] = useState<Coordinate | null>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (cells) {
                switch (e.key) {
                    case "Escape":
                        setEditingCell(null)
                        break
                    case "ArrowUp":
                        if(editingCell) {
                            break
                        }
                        if (e.shiftKey) {
                            const findNewY = (y: number): number => {
                                const inMergedCell = merged_cells.find(mergedCellRange => (
                                    Array.from<number>({length: selectedCells.end.x - selectedCells.start.x + 1}).some((_, index) => (
                                        mergedCellRange.start.x <= index + selectedCells.start.x &&
                                        index + selectedCells.start.x <= mergedCellRange.end.x &&
                                        mergedCellRange.start.y <= y - 1 &&
                                        y - 1 < mergedCellRange.end.y
                                    ))
                                ))
                                if(inMergedCell) {
                                    return findNewY(inMergedCell.start.y)
                                }
                                else {
                                    return Math.max(y - 1, 0)
                                }
                            }
                            const newStartY = findNewY(selectedCells.start.y)
                            const newEndY = findNewY(selectedCells.end.y)
                            // Cell range from draggingStartCell as ref
                            const selectedDragginStartCellsMergeCells = merged_cells.filter(mergedCellRange => (
                                Array.from<number>({length: selectedCells.end.x - selectedCells.start.x + 1}).some((_, index) => (
                                    mergedCellRange.start.x <= index + selectedCells.start.x &&
                                    index + selectedCells.start.x <= mergedCellRange.end.x &&
                                    mergedCellRange.start.y <= draggingStartCell.y &&
                                    draggingStartCell.y <= mergedCellRange.end.y
                                ))
                            ))
                            const newSelection = findSelection({
                                selectedCells: {
                                    ...selectedCells,
                                    ...((
                                        selectedCells.end.y <= Math.min(...selectedDragginStartCellsMergeCells.map(mergedCellRange => mergedCellRange.start.y), draggingStartCell.y) ||
                                        selectedCells.end.y <= Math.max(...selectedDragginStartCellsMergeCells.map(mergedCellRange => mergedCellRange.end.y), draggingStartCell.y)
                                    ) ? {
                                        start: {
                                            ...selectedCells.start,
                                            y: newStartY,
                                        }
                                    } : {
                                        end: {
                                            ...selectedCells.end,
                                            y: newEndY,
                                        }
                                    })
                                },
                                mergedCells: merged_cells,
                            })
                            setSelectedCells(newSelection)
                        }
                        else {
                            const newSelection = findSelection({
                                    selectedCells: {
                                        ...selectedCells,
                                        start: {
                                            x: selectedCells.start.x,
                                            y: Math.max(selectedCells.start.y - 1, 0),
                                        },
                                        end: {
                                            x: selectedCells.start.x,
                                            y: Math.max(selectedCells.start.y - 1, 0),
                                        }
                                    },
                                    mergedCells: merged_cells,
                                })
                            setDraggingStartCell(newSelection.start)
                            setSelectedCells(newSelection)
                        }
                        break
                    case "ArrowDown":
                        if(editingCell) {
                            break
                        }
                        if (e.shiftKey) {
                            const findNewY = (y: number): number => {
                                const inMergedCell = merged_cells.find(mergedCellRange => (
                                    Array.from<number>({length: selectedCells.end.x - selectedCells.start.x + 1}).some((_, index) => (
                                        mergedCellRange.start.x <= index + selectedCells.start.x &&
                                        index + selectedCells.start.x <= mergedCellRange.end.x &&
                                        mergedCellRange.start.y < y + 1 &&
                                        y + 1 <= mergedCellRange.end.y
                                    ))
                                ))
                                if(inMergedCell) {
                                    return findNewY(inMergedCell.end.y)
                                }
                                else {
                                    return Math.min(y + 1, cells.length - 1)
                                }
                            }
                            const newStartY = findNewY(selectedCells.start.y)
                            const newEndY = findNewY(selectedCells.end.y)
                            const selectedDragginStartCellsMergeCells = merged_cells.filter(mergedCellRange => (
                                Array.from<number>({length: selectedCells.end.x - selectedCells.start.x + 1}).some((_, index) => (
                                    mergedCellRange.start.x <= index + selectedCells.start.x &&
                                    index + selectedCells.start.x <= mergedCellRange.end.x &&
                                    mergedCellRange.start.y <= draggingStartCell.y &&
                                    draggingStartCell.y <= mergedCellRange.end.y
                                ))
                            ))
                            const newSelection = findSelection({
                                selectedCells: {
                                    ...selectedCells,
                                    ...((
                                        selectedCells.start.y >= Math.min(...selectedDragginStartCellsMergeCells.map(mergedCellRange => mergedCellRange.start.y), draggingStartCell.y) ||
                                        selectedCells.start.y >= Math.max(...selectedDragginStartCellsMergeCells.map(mergedCellRange => mergedCellRange.start.y), draggingStartCell.y)
                                    ) ? {
                                        end: {
                                            ...selectedCells.end,
                                            y: newEndY,
                                        }
                                    } : {
                                        start: {
                                            ...selectedCells.start,
                                            y: newStartY,
                                        }
                                    })
                                },
                                mergedCells: merged_cells,
                            })
                            setSelectedCells(newSelection)
                        }
                        else {
                            const newSelection = findSelection({
                                selectedCells: {
                                    start: {
                                        x: selectedCells.start.x,
                                        y: Math.min(selectedCells.end.y + 1, cells.length - 1),
                                    },
                                    end: {
                                        x: selectedCells.start.x,
                                        y: Math.min(selectedCells.end.y + 1, cells.length - 1),
                                    }
                                },
                                mergedCells: merged_cells,
                            })
                            setDraggingStartCell(newSelection.start)
                            setSelectedCells(newSelection)
                        }
                        break
                    case "ArrowLeft":
                        if(editingCell) {
                            break
                        }
                        if (e.shiftKey) {
                            const findNewX = (x: number): number => {
                                const inMergedCell = merged_cells.find(mergedCellRange => (
                                    Array.from<number>({length: selectedCells.end.y - selectedCells.start.y + 1}).some((_, index) => (
                                        mergedCellRange.start.x <= x - 1 &&
                                        x - 1 < mergedCellRange.end.x &&
                                        mergedCellRange.start.y <= index + selectedCells.start.y &&
                                        index + selectedCells.start.y <= mergedCellRange.end.y
                                    ))
                                ))
                                if(inMergedCell) {
                                    return findNewX(inMergedCell.start.x)
                                }
                                else {
                                    return Math.max(x - 1, 0)
                                }
                            }
                            const newStartX = findNewX(selectedCells.start.x)
                            const newEndX = findNewX(selectedCells.end.x)
                            // Cell range from draggingStartCell as ref
                            const selectedDragginStartCellsMergeCells = merged_cells.filter(mergedCellRange => (
                                Array.from<number>({length: selectedCells.end.y - selectedCells.start.y + 1}).some((_, index) => (
                                    mergedCellRange.start.x <= draggingStartCell.x &&
                                    draggingStartCell.x <= mergedCellRange.end.x &&
                                    mergedCellRange.start.y <= index + selectedCells.start.y &&
                                    index + selectedCells.start.y <= mergedCellRange.end.y
                                ))
                            ))
                            const newSelection = findSelection({
                                selectedCells: {
                                    ...selectedCells,
                                    ...((
                                        selectedCells.end.x <= Math.min(...selectedDragginStartCellsMergeCells.map(mergedCellRange => mergedCellRange.start.x), draggingStartCell.x) ||
                                        selectedCells.end.x <= Math.max(...selectedDragginStartCellsMergeCells.map(mergedCellRange => mergedCellRange.end.x), draggingStartCell.x)
                                    ) ? {
                                        start: {
                                            ...selectedCells.start,
                                            x: newStartX,
                                        }
                                    } : {
                                        end: {
                                            ...selectedCells.end,
                                            x: newEndX,
                                        }
                                    })
                                },
                                mergedCells: merged_cells,
                            })
                            setSelectedCells(newSelection)
                        }
                        else {
                            const newSelection = findSelection({
                                selectedCells: {
                                    start: {
                                        x: Math.max(selectedCells.start.x - 1, 0),
                                        y: selectedCells.start.y,
                                    },
                                    end: {
                                        x: Math.max(selectedCells.start.x - 1, 0),
                                        y: selectedCells.start.y,
                                    }
                                },
                                mergedCells: merged_cells,
                            })
                            setDraggingStartCell(newSelection.start)
                            setSelectedCells(newSelection)
                        }
                        break
                    case "ArrowRight":
                        if(editingCell) {
                            break
                        }
                        if (e.shiftKey) {
                            const findNewX = (x: number): number => {
                                const inMergedCell = merged_cells.find(mergedCellRange => (
                                    Array.from<number>({length: selectedCells.end.y - selectedCells.start.y + 1}).some((_, index) => (
                                        mergedCellRange.start.y <= index + selectedCells.start.y &&
                                        index + selectedCells.start.y <= mergedCellRange.end.y &&
                                        mergedCellRange.start.x < x + 1 &&
                                        x + 1 <= mergedCellRange.end.x
                                    ))
                                ))
                                if(inMergedCell) {
                                    return findNewX(inMergedCell.end.x)
                                }
                                else {
                                    return Math.min(x + 1, cells[0].length - 1)
                                }
                            }
                            const newStartX = findNewX(selectedCells.start.x)
                            const newEndX = findNewX(selectedCells.end.x)
                            const selectedDragginStartCellsMergeCells = merged_cells.filter(mergedCellRange => (
                                Array.from<number>({length: selectedCells.end.y - selectedCells.start.y + 1}).some((_, index) => (
                                    mergedCellRange.start.y <= index + selectedCells.start.y &&
                                    index + selectedCells.start.y <= mergedCellRange.end.y &&
                                    mergedCellRange.start.x <= draggingStartCell.x &&
                                    draggingStartCell.x <= mergedCellRange.end.x
                                ))
                            ))
                            const newSelection = findSelection({
                                selectedCells: {
                                    ...selectedCells,
                                    ...((
                                        selectedCells.start.x >= Math.min(...selectedDragginStartCellsMergeCells.map(mergedCellRange => mergedCellRange.start.x), draggingStartCell.x) ||
                                        selectedCells.start.x >= Math.max(...selectedDragginStartCellsMergeCells.map(mergedCellRange => mergedCellRange.start.x), draggingStartCell.x)
                                    ) ? {
                                        end: {
                                            ...selectedCells.end,
                                            x: newEndX,
                                        }
                                    } : {
                                        start: {
                                            ...selectedCells.start,
                                            x: newStartX,
                                        }
                                    })
                                },
                                mergedCells: merged_cells,
                            })
                            setSelectedCells(newSelection)
                        }
                        else {
                            const newSelection = findSelection({
                                selectedCells: {
                                    start: {
                                        x: Math.min(selectedCells.end.x + 1, cells[0].length - 1),
                                        y: selectedCells.start.y,
                                    },
                                    end: {
                                        x: Math.min(selectedCells.end.x + 1, cells[0].length - 1),
                                        y: selectedCells.start.y,
                                    }
                                },
                                mergedCells: merged_cells,
                            })
                            setDraggingStartCell(newSelection.start)
                            setSelectedCells(newSelection)
                        }
                        break
                    case "F2":
                        setEditingCell(draggingStartCell)
                        setSelectedCells(
                            findSelection({
                                selectedCells: {
                                    start: draggingStartCell,
                                    end: draggingStartCell,
                                },
                                mergedCells: merged_cells,
                            })
                        )
                        break
                    default:
                        break
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [
        selectedCells,
        draggingStartCell,
        editingCell,
    ])

    const canInsertRowAbove = !cells.some((row, rowIndex) => (
        row.some((_, cellIndex) => (
            selectedCells.start.y === rowIndex &&
            merged_cells.some(mergedCellRange => (
                mergedCellRange.start.y <= rowIndex &&
                rowIndex <= mergedCellRange.end.y &&
                mergedCellRange.start.x !== cellIndex &&
                mergedCellRange.start.y !== rowIndex
            ))
        ))
    ))
    const canInsertRowBelow = !cells.some((row, rowIndex) => (
        row.some((_, cellIndex) => (
            selectedCells.end.y === rowIndex &&
            merged_cells.some(mergedCellRange => (
                mergedCellRange.start.y <= rowIndex &&
                rowIndex <= mergedCellRange.end.y &&
                mergedCellRange.end.x !== cellIndex &&
                mergedCellRange.end.y !== rowIndex
            ))
        ))
    ))
    const canInsertColumnBefore = !cells.some((row, rowIndex) => (
        row.some((_, cellIndex) => (
            selectedCells.start.x === cellIndex &&
            merged_cells.some(mergedCellRange => (
                mergedCellRange.start.x <= cellIndex &&
                cellIndex <= mergedCellRange.end.x &&
                mergedCellRange.start.x !== cellIndex &&
                mergedCellRange.start.y !== rowIndex
            ))
        ))
    ))
    const canInsertColumnAfter = !cells.some((row, rowIndex) => (
        row.some((_, cellIndex) => (
            selectedCells.end.x === cellIndex &&
            merged_cells.some(mergedCellRange => (
                mergedCellRange.start.x <= cellIndex &&
                cellIndex <= mergedCellRange.end.x &&
                mergedCellRange.end.x !== cellIndex &&
                mergedCellRange.end.y !== rowIndex
            ))
        ))
    ))
    const canDeleteRow = !cells.some((row, rowIndex) => (
        selectedCells.start.y <= rowIndex &&
        rowIndex <= selectedCells.end.y &&
        merged_cells.some(mergedCellRange => (
            row.some((_, cellIndex) => (
                mergedCellRange.start.x <= cellIndex &&
                cellIndex <= mergedCellRange.end.x &&
                mergedCellRange.start.y <= rowIndex &&
                rowIndex <= mergedCellRange.end.y
            ))
        )
    )))
    const canDeleteColumn = !cells.some((row, rowIndex) => (
        row.some((_, cellIndex) => (
            selectedCells.start.x <= cellIndex &&
            cellIndex <= selectedCells.end.x &&
            merged_cells.some(mergedCellRange => (
                mergedCellRange.start.x <= cellIndex &&
                cellIndex <= mergedCellRange.end.x &&
                mergedCellRange.start.y <= rowIndex &&
                rowIndex <= mergedCellRange.end.y
            ))
        ))
    ))
    return (
        <div
        className={`${
            Class.spreadsheetjs
        }${viewOnlyMode ? `${Class.viewOnly}` : ""}`}
        >
            {allRequiredPropProvided === null ? (
                <>Initializing Spreadsheet...</>
            ) : (cells && rows_height && cols_width) ? (
                <>
                    {!viewOnlyMode && (
                        <Toolbar
                        spreadsheetData={{
                            cells,
                            rows_height,
                            cols_width,
                            merged_cells,
                        }}
                        onChange={onChange}
                        selectedCells={selectedCells}
                        setSelectedCells={setSelectedCells}
                        draggingStartCell={draggingStartCell}
                        setDraggingStartCell={setDraggingStartCell}
                        canInsertRowAbove={canInsertRowAbove}
                        canInsertRowBelow={canInsertRowBelow}
                        canDeleteRow={canDeleteRow}
                        canInsertColumnBefore={canInsertColumnBefore}
                        canInsertColumnAfter={canInsertColumnAfter}
                        canDeleteColumn={canDeleteColumn}
                        preAddImage={preAddImage}
                        appendToolbar={appendToolbar}
                        disableDefaultToolbar={disableDefaultToolbar}
                        />
                    )}
                    <Table
                    spreadsheetData={{
                        cells,
                        rows_height,
                        cols_width,
                        merged_cells,
                    }}
                    viewOnlyMode={viewOnlyMode}
                    onChange={onChange}
                    editingCell={editingCell}
                    setEditingCell={setEditingCell}
                    isDragging={isDragging}
                    setIsDragging={setIsDragging}
                    draggingStartCell={draggingStartCell}
                    setDraggingStartCell={setDraggingStartCell}
                    selectedCells={selectedCells}
                    setSelectedCells={setSelectedCells}
                    canInsertRowAbove={canInsertRowAbove}
                    canInsertRowBelow={canInsertRowBelow}
                    canDeleteRow={canDeleteRow}
                    canInsertColumnBefore={canInsertColumnBefore}
                    canInsertColumnAfter={canInsertColumnAfter}
                    canDeleteColumn={canDeleteColumn}
                    overrideResizeColumnPrompt={overrideResizeColumnPrompt}
                    overrideResizeRowPrompt={overrideResizeRowPrompt}
                    appendCellMenu={appendCellMenu}
                    appendRowCellMenu={appendRowCellMenu}
                    appendColumnCellMenu={appendColumnCellMenu}
                    preAddImage={preAddImage}
                    disableDefaultCellMenu={disableDefaultCellMenu}
                    disableDefaultRowCellMenu={disableDefaultRowCellMenu}
                    disableDefaultColumnCellMenu={disableDefaultColumnCellMenu}
                    />
                </>
            ) : (<></>)}
        </div>
    )
}

export default Spreadsheet

import Class from "./Spreadsheet.module.css"

import { useEffect, useState } from "react"
import type { Coordinate, SelectedCells, SpreadsheetData, SpreadsheetProps } from "./Spreadsheet.interface"
import Toolbar from "./Toolbar/Toolbar"
import Table from "./Table/Table"

// import ColorPicker from "./Toolbar/Components/ColorPicker/ColorPicker"

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
}

const Spreadsheet = ({
    cells,
    rows_height,
    cols_width,
    viewOnlyMode = false,
    onChange = (_: SpreadsheetData) => {},
    overrideResizeColumnPrompt,
    overrideResizeRowPrompt,
    appendCellMenus,
    preAddImage,
}: SpreadsheetProps) => {
    
    const [allRequiredPropProvided, setAllRequiredPropProvided] = useState<boolean | null>(null)
    
    useEffect(() => {
        if(cells && rows_height && cols_width) {
            if(cells.length !== rows_height.length || cells.every(row => row.length !== cols_width.length)) {
                setAllRequiredPropProvided(false)
                throw new Error("SpreadsheetJSReact: The length of rows_height must match the number of rows in cells, and the length of cols_width must match the number of columns in cells.")
            }
            else {
                setAllRequiredPropProvided(true)
            }
        }
        else if(!cells && !rows_height && !cols_width) {
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
    const [selectedCells, setSelectedCells] = useState<SelectedCells>({
        start: {
            x: 0,
            y: 0,
        },
        end: {
            x: 0,
            y: 0,
        }
    })
    const [editingCell, setEditingCell] = useState<Coordinate | null>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if(cells) {
                switch(e.key) {
                    case "Escape":
                        setEditingCell(null)
                        break
                    case "ArrowUp":
                        if(editingCell) {
                            break
                        }
                        if(e.shiftKey) {
                            setSelectedCells(prev => ({
                                ...prev,
                                ...((
                                    draggingStartCell.y === prev.end.y
                                ) ? {
                                    start: {
                                        ...prev.start,
                                        y: Math.max(prev.start.y - 1, 0)
                                    }
                                } : {
                                    end: {
                                        ...prev.end,
                                        y: Math.max(prev.end.y - 1, 0)
                                    }
                                })
                            }))
                        }
                        else {
                            setDraggingStartCell({
                                x: selectedCells.start.x,
                                y: Math.max(selectedCells.start.y - 1, 0),
                            })
                            setSelectedCells(prev => ({
                                start: {
                                    x: selectedCells.start.x,
                                    y: Math.max(prev.start.y - 1, 0),
                                },
                                end: {
                                    x: selectedCells.start.x,
                                    y: Math.max(prev.start.y - 1, 0),
                                }
                            }))
                        }
                        break
                    case "ArrowDown":
                        if(editingCell) {
                            break
                        }
                        if(e.shiftKey) {
                            setSelectedCells(prev => ({
                                ...prev,
                                ...((
                                    draggingStartCell.y === prev.start.y
                                ) ? {
                                    end: {
                                        ...prev.end,
                                        y: Math.min(prev.end.y + 1, cells.length - 1)
                                    }
                                } : {
                                    start: {
                                        ...prev.start,
                                        y: Math.min(prev.start.y + 1, cells.length - 1)
                                    }
                                })
                            }))
                        }
                        else {
                            setDraggingStartCell({
                                x: selectedCells.start.x,
                                y: Math.min(selectedCells.start.y + 1, cells.length - 1),
                            })
                            setSelectedCells(prev => ({
                                start: {
                                    x: selectedCells.start.x,
                                    y: Math.min(prev.start.y + 1, cells.length - 1),
                                },
                                end: {
                                    x: selectedCells.start.x,
                                    y: Math.min(prev.start.y + 1, cells.length - 1),
                                }
                            }))
                        }
                        break
                    case "ArrowLeft":
                        if(editingCell) {
                            break
                        }
                        if(e.shiftKey) {
                            setSelectedCells(prev => ({
                                ...prev,
                                ...((
                                    draggingStartCell.x === prev.end.x
                                ) ? {
                                    start: {
                                        ...prev.start,
                                        x: Math.max(prev.start.x - 1, 0)
                                    }
                                } : {
                                    end: {
                                        ...prev.end,
                                        x: Math.max(prev.end.x - 1, 0)
                                    }
                                })
                            }))
                        }
                        else {
                            setDraggingStartCell({
                                x: Math.max(selectedCells.start.x - 1, 0),
                                y: selectedCells.start.y,
                            })
                            setSelectedCells(prev => ({
                                start: {
                                    x: Math.max(prev.start.x - 1, 0),
                                    y: selectedCells.start.y,
                                },
                                end: {
                                    x: Math.max(prev.start.x - 1, 0),
                                    y: selectedCells.start.y,
                                }
                            }))
                        }
                        break
                    case "ArrowRight":
                        if(editingCell) {
                            break
                        }
                        if(e.shiftKey) {
                            setSelectedCells(prev => ({
                                ...prev,
                                ...((
                                    draggingStartCell.x === prev.start.x
                                ) ? {
                                    end: {
                                        ...prev.end,
                                        x: Math.min(prev.end.x + 1, cells[0].length - 1)
                                    }
                                } : {
                                    start: {
                                        ...prev.start,
                                        x: Math.min(prev.start.x + 1, cells[0].length - 1)
                                    }
                                })
                            }))
                        }
                        else {
                            setDraggingStartCell({
                                x: Math.min(selectedCells.start.x + 1, cells[0].length - 1),
                                y: selectedCells.start.y,
                            })
                            setSelectedCells(prev => ({
                                start: {
                                    x: Math.min(prev.start.x + 1, cells[0].length - 1),
                                    y: selectedCells.start.y,
                                },
                                end: {
                                    x: Math.min(prev.start.x + 1, cells[0].length - 1),
                                    y: selectedCells.start.y,
                                }
                            }))
                        }
                        break
                    case "F2":
                        setEditingCell(draggingStartCell)
                        setSelectedCells({
                            start: draggingStartCell,
                            end: draggingStartCell,
                        })
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
        draggingStartCell
    ])

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
                        }}
                        onChange={onChange}
                        selectedCells={selectedCells}
                        draggingStartCell={draggingStartCell}
                        setDraggingStartCell={setDraggingStartCell}
                        preAddImage={preAddImage}
                        />
                    )}
                    <Table
                    spreadsheetData={{
                        cells,
                        rows_height,
                        cols_width,
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
                    overrideResizeColumnPrompt={overrideResizeColumnPrompt}
                    overrideResizeRowPrompt={overrideResizeRowPrompt}
                    appendCellMenus={appendCellMenus}
                    preAddImage={preAddImage}
                    />
                </>
            ) : (<></>)}
        </div>
    )
}

export default Spreadsheet

import Class from "./Spreadsheet.module.css"

import { useEffect, useState } from "react"
import type { Coordinate, SelectedCells, SpreadsheetData, SpreadsheetProps } from "./Spreadsheet.interface"
import Toolbar from "./Toolbar/Toolbar"
import Table from "./Table/Table"

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
    }]],
    rows_height: [50, 50, 50, 50],
    cols_width: [100, 100, 100, 100],
}

const Spreadsheet = ({
    spreadsheet = defaultSpreadsheetData,
    onChange = (_: SpreadsheetData) => {},
}: SpreadsheetProps) => {

    const [spreadsheetData, setSpreadsheetData] = useState<SpreadsheetData>(spreadsheet)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [draggingStartCell, setDraggingStartCell] = useState<Coordinate>({
        x: 0,
        y: 0,
    })
    // const [isResizingColumn, setIsResizingColumn] = useState<boolean>(false)
    // const [resizingColumnIndex, setResizingColumnIndex] = useState<number | null>(null)
    // const [isResizingRow, setIsResizingRow] = useState<boolean>(false)
    // const [resizingRowIndex, setResizingRowIndex] = useState<number | null>(null)
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
        onChange(spreadsheetData)
    }, [spreadsheetData])

    return (
        <div
        className={Class.spreadsheetjs}
        >
            <Toolbar
            spreadsheetData={spreadsheetData}
            setSpreadsheetData={setSpreadsheetData}
            selectedCells={selectedCells}
            />
            <Table
            spreadsheetData={spreadsheetData}
            setSpreadsheetData={setSpreadsheetData}
            editingCell={editingCell}
            setEditingCell={setEditingCell}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
            draggingStartCell={draggingStartCell}
            setDraggingStartCell={setDraggingStartCell}
            selectedCells={selectedCells}
            setSelectedCells={setSelectedCells}
            />
        </div>
    )
}

export default Spreadsheet
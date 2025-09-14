import Class from "./Table.module.css"
import type { TableProps } from "./Table.interface"
import Cell from "./Cell/Cell"
import { cellStopDragging } from "./Cell/Cell.event"
import { useEffect } from "react"
import { checkIsInsideSelectedCells, isSameCoordinate } from "../Spreadsheet.util"
import { allDragging, allStartDragging, columnDragging, columnStartDragging, rowDragging, rowStartDragging } from "./Table.event"

const Table = ({
    spreadsheetData,
    setSpreadsheetData,
    editingCell,
    setEditingCell,
    isDragging,
    setIsDragging,
    draggingStartCell,
    setDraggingStartCell,
    selectedCells,
    setSelectedCells,
}: TableProps) => {

    useEffect(() => {
        // const dragging = (e) => {
            // if(isResizingRow) {
            //     resizeRow(e.clientY)
            // }
            // else if(isResizingColumn) {
            //     resizeColumn(e.clientX)
            // }
        // }
        const stopDragging = () => {
            // if(isResizingRow) {
            //     setIsResizingRow(false)
            //     setResizingRow(null)
            // }
            // else if(isResizingColumn) {
            //     setIsResizingColumn(false)
            //     setResizingColumn(null)
            // }
            if(isDragging) {
                cellStopDragging({ setIsDragging })
            }
        }
        // document.addEventListener("mouseover", dragging);
        document.addEventListener("mouseup", stopDragging);
        return () => {
            // document.removeEventListener("mouseover", dragging);
            document.removeEventListener("mouseup", stopDragging);
        };
    }, [
        isDragging
        // isResizingColumn,
        // isResizingRow,
    ])

    const { rows_height, cols_width, cells } = spreadsheetData
    
    return (
        <table
        className={Class.table}
        cellPadding={4}
        cellSpacing={0}
        unselectable={"on"}
        >
            <colgroup>
                <col width={50}/>
                {cols_width.map((width, i) => (
                    <col
                    key={i}
                    width={width}
                    />
                ))}
            </colgroup>
            <thead>
                <tr
                >
                    <td
                    className={(isSameCoordinate(selectedCells.start, {
                                x: 0,
                                y: 0,
                            }) &&
                            isSameCoordinate(selectedCells.end, {
                                x: spreadsheetData.cells[0].length - 1,
                                y: spreadsheetData.cells.length - 1,
                            })) ? Class.selected : ""}
                    onMouseDown={() => allStartDragging({
                        cells: spreadsheetData.cells,
                        setIsDragging,
                        setDraggingStartCell,
                        setSelectedCells,
                    })}
                    onMouseOver={() => allDragging({
                        cells: spreadsheetData.cells,
                        isDragging,
                        setSelectedCells,
                    })}
                    />
                    {cols_width.map((_, i) => (
                        <td
                        key={String.fromCharCode(65 + i)}
                        style={{
                            backgroundColor: (
                                checkIsInsideSelectedCells({
                                    coordinate: {
                                        x: i,
                                        y: selectedCells.start.y, // any start - end
                                    }, selectedCells,
                                })
                            ) ? "#dcdcdc" : "#f3f3f3"
                        }}
                        onMouseDown={() => columnStartDragging({
                            columnIndex: i,
                            cells: spreadsheetData.cells,
                            setIsDragging,
                            setDraggingStartCell,
                            setSelectedCells,
                        })}
                        onMouseOver={() => columnDragging({
                            columnIndex: i,
                            cells,
                            isDragging,
                            setSelectedCells,
                            draggingStartCell,
                        })}
                        >
                            {`${String.fromCharCode(65 + i)}`}
                        </td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {cells.map((row, rowIndex) => (
                    <tr
                    key={rowIndex}
                    style={{
                        height: `${rows_height[rowIndex]}px`
                    }}
                    >
                        <td
                        style={{
                            backgroundColor: (
                                checkIsInsideSelectedCells({
                                    coordinate: {
                                        x: selectedCells.start.x, // any start - end
                                        y: rowIndex,
                                    }, selectedCells,
                                })
                            ) ? "#dcdcdc" : "#f3f3f3"
                        }}
                        onMouseDown={()=>rowStartDragging({
                            rowIndex,
                            cells,
                            setIsDragging,
                            setDraggingStartCell,
                            setSelectedCells,
                        })}
                        onMouseOver={()=>rowDragging({
                            rowIndex,
                            cells,
                            isDragging,
                            setSelectedCells,
                            draggingStartCell,
                        })}
                        >
                            {rowIndex + 1}
                        </td>
                        {row.map((_, colIndex) => (
                            <Cell
                            key={`${String.fromCharCode(65 + colIndex)}${rowIndex}`}
                            cell={cells[rowIndex][colIndex]}
                            coordinate={{
                                x: colIndex,
                                y: rowIndex,
                            }}
                            cells={cells}
                            editingCell={editingCell}
                            setEditingCell={setEditingCell}
                            setSpreadsheetData={setSpreadsheetData}
                            isDragging={isDragging}
                            setIsDragging={setIsDragging}
                            draggingStartCell={draggingStartCell}
                            setDraggingStartCell={setDraggingStartCell}
                            selectedCells={selectedCells}
                            setSelectedCells={setSelectedCells}
                            height={rows_height[rowIndex]}
                            width={cols_width[colIndex]}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
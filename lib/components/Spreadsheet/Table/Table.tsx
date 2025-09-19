import Class from "./Table.module.css"
import type { TableProps } from "./Table.interface"
import Cell from "./Cell/Cell/Cell"
import { cellStopDragging } from "./Cell/Cell/Cell.event"
import { useEffect, useRef, useState } from "react"
import { isSameCoordinate } from "../Spreadsheet.util"
import { allDragging, allStartDragging } from "./Table.event"
import ColumnCell from "./Cell/ColumnCell/ColumnCell"
import RowCell from "./Cell/RowCell/RowCell"
import CellMenu from "./CellMenu/CellMenu/CellMenu"
import RowCellMenu from "./CellMenu/RowCellMenu/RowCellMenu"
import ColumnCellMenu from "./CellMenu/ColumnCellMenu/ColumnCellMenu"

const Table = ({
    spreadsheetData,
    onChange,
    editingCell,
    setEditingCell,
    isDragging,
    setIsDragging,
    draggingStartCell,
    setDraggingStartCell,
    selectedCells,
    setSelectedCells,
}: TableProps) => {
    const edgeThreshold = 5

    useEffect(() => {
        const stopDragging = () => {
            if(isDragging) {
                cellStopDragging({ setIsDragging })
            }
        }
        document.addEventListener("mouseup", stopDragging);
        return () => {
            document.removeEventListener("mouseup", stopDragging);
        };
    }, [
        isDragging
    ])

    const { rows_height, cols_width, cells } = spreadsheetData
    const [isCellContextMenuOpen, setIsCellContextMenuOpen] = useState(false)
    const [isRowCellContextMenuOpen, setIsRowCellContextMenuOpen] = useState(false)
    const [isColumnCellContextMenuOpen, setIsColumnCellContextMenuOpen] = useState(false)
    const cellContextMenuRef = useRef<HTMLDivElement>(null)
    const rowCellContextMenuRef = useRef<HTMLDivElement>(null)
    const columnCellContextMenuRef = useRef<HTMLDivElement>(null)
    
    useEffect(() => {
        const closeContextMenu = (e: MouseEvent) => {
            if(cellContextMenuRef.current && !cellContextMenuRef.current.contains(e.target as Node)) {
                setIsCellContextMenuOpen(false)
            }
            if(rowCellContextMenuRef.current && !rowCellContextMenuRef.current.contains(e.target as Node)) {
                setIsRowCellContextMenuOpen(false)
            }
            if(columnCellContextMenuRef.current && !columnCellContextMenuRef.current.contains(e.target as Node)) {
                setIsColumnCellContextMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", closeContextMenu);
        return () => {
            document.removeEventListener("mousedown", closeContextMenu);
        }
    }, [])

    return (
        <>
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
                            <ColumnCell
                            key={String.fromCharCode(65 + i)}
                            columnIndex={i}
                            spreadsheetData={spreadsheetData}
                            onChange={onChange}
                            isDragging={isDragging}
                            setIsDragging={setIsDragging}
                            draggingStartCell={draggingStartCell}
                            setDraggingStartCell={setDraggingStartCell}
                            selectedCells={selectedCells}
                            setSelectedCells={setSelectedCells}
                            cells={cells}
                            edgeThreshold={edgeThreshold}
                            contextMenuRef={columnCellContextMenuRef}
                            setIsContextMenuOpen={setIsColumnCellContextMenuOpen}
                            />
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
                            <RowCell
                            rowIndex={rowIndex}
                            isDragging={isDragging}
                            setIsDragging={setIsDragging}
                            draggingStartCell={draggingStartCell}
                            setDraggingStartCell={setDraggingStartCell}
                            selectedCells={selectedCells}
                            setSelectedCells={setSelectedCells}
                            cells={cells}
                            spreadsheetData={spreadsheetData}
                            onChange={onChange}
                            edgeThreshold={edgeThreshold}
                            contextMenuRef={rowCellContextMenuRef}
                            setIsContextMenuOpen={setIsRowCellContextMenuOpen}
                            />
                            {row.map((_, colIndex) => (
                                <Cell
                                key={`${String.fromCharCode(65 + colIndex)}${rowIndex}`}
                                cell={cells[rowIndex][colIndex]}
                                coordinate={{
                                    x: colIndex,
                                    y: rowIndex,
                                }}
                                editingCell={editingCell}
                                setEditingCell={setEditingCell}
                                spreadsheetData={spreadsheetData}
                                onChange={onChange}
                                isDragging={isDragging}
                                setIsDragging={setIsDragging}
                                draggingStartCell={draggingStartCell}
                                setDraggingStartCell={setDraggingStartCell}
                                selectedCells={selectedCells}
                                setSelectedCells={setSelectedCells}
                                contextMenuRef={cellContextMenuRef}
                                setIsContextMenuOpen={setIsCellContextMenuOpen}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <CellMenu
                spreadsheetData={spreadsheetData}
                onChange={onChange}
                selectedCells={selectedCells}
                setSelectedCells={setSelectedCells}
                setDraggingStartCell={setDraggingStartCell}
                contextMenuRef={cellContextMenuRef}
                isContextMenuOpen={isCellContextMenuOpen}
                setIsContextMenuOpen={setIsCellContextMenuOpen}
            />
            <RowCellMenu
                spreadsheetData={spreadsheetData}
                onChange={onChange}
                selectedCells={selectedCells}
                setSelectedCells={setSelectedCells}
                setDraggingStartCell={setDraggingStartCell}
                contextMenuRef={rowCellContextMenuRef}
                isContextMenuOpen={isRowCellContextMenuOpen}
                setIsContextMenuOpen={setIsRowCellContextMenuOpen}
            />
            <ColumnCellMenu
                spreadsheetData={spreadsheetData}
                onChange={onChange}
                selectedCells={selectedCells}
                setSelectedCells={setSelectedCells}
                setDraggingStartCell={setDraggingStartCell}
                contextMenuRef={columnCellContextMenuRef}
                isContextMenuOpen={isColumnCellContextMenuOpen}
                setIsContextMenuOpen={setIsColumnCellContextMenuOpen}
            />
        </>
    )
}

export default Table
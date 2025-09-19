import { useEffect, useState } from "react"
import { checkIsInsideSelectedCells } from "../../../Spreadsheet.util"
import { rowDragging, rowStartDragging } from "./RowCell.event"
import type { ResizingRow, RowCellProps } from "./RowCell.interface"

const RowCell = ({
    rowIndex,
    spreadsheetData,
    onChange,
    isDragging,
    setIsDragging,
    draggingStartCell,
    setDraggingStartCell,
    selectedCells,
    setSelectedCells,
    edgeThreshold,
    contextMenuRef,
    setIsContextMenuOpen,
}: RowCellProps) => {

    const isInsideSelectedCells = checkIsInsideSelectedCells({
        coordinate: { x: selectedCells.start.x, y: rowIndex },
        selectedCells
    })

    const [isResizingRow, setIsResizingRow] = useState<boolean>(false)
    const [resizingRow, setResizingRow] = useState<ResizingRow | null>(null)

    const startResizeRow = (e: React.MouseEvent) => {
        setIsResizingRow(true)
        setResizingRow({
            y: rowIndex,
            startY: e.clientY,
            startHeight: spreadsheetData.rows_height[rowIndex],
        })
    }

    const resizeRow = (e: MouseEvent) => {
        if (isResizingRow && resizingRow !== null) {
            const deltaY = e.clientY - resizingRow.startY
            const newHeight = Math.max(25, resizingRow?.startHeight + deltaY)
            onChange({
                ...spreadsheetData,
                rows_height: spreadsheetData.rows_height.map((h, i) => i === resizingRow?.y ? newHeight : h)
            })
        }
    }

    const stopResizeRow = () => {
        setIsResizingRow(false)
        setResizingRow(null)
    }

    const onMouseDown = (e: React.MouseEvent) => {
        const checkRightClick = () => {
            if ("which" in e) {
                return e.which === 3
            }
            else if ("button" in e) {
                return e.button === 2
            }
            else {
                return false
            }
        }
        if(checkRightClick() && isInsideSelectedCells) {
            e.preventDefault()
        }
        else {
            const rect = (e.target as HTMLElement).getBoundingClientRect()
            if (e.clientY > rect.bottom - edgeThreshold && e.clientY <= rect.bottom) {
                startResizeRow(e)
            }
            else {
                rowStartDragging({
                    rowIndex,
                    cells: spreadsheetData.cells,
                    setIsDragging,
                    setDraggingStartCell,
                    setSelectedCells,
                })
            }
        }
    }

    const onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        contextMenuRef.current?.style.setProperty("top", `${e.clientY}px`)
        contextMenuRef.current?.style.setProperty("left", `${e.clientX}px`)
        setIsContextMenuOpen(true)
    }

    useEffect(() => {
        const closeContextMenu = (e: MouseEvent) => {
            if(contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
                setIsContextMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", closeContextMenu);
        return () => {
            document.removeEventListener("mousedown", closeContextMenu);
        }
    }, [])

    useEffect(() => {
        document.addEventListener("mousemove", resizeRow);
        document.addEventListener("mouseup", stopResizeRow);
        return () => {
            document.removeEventListener("mousemove", resizeRow);
            document.removeEventListener("mouseup", stopResizeRow);
        }
    }, [isResizingRow])

    return (
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
        onMouseDown={onMouseDown}
        onMouseOver={() => {
            if (isResizingRow) return
            rowDragging({
                rowIndex,
                cells: spreadsheetData.cells,
                isDragging,
                setSelectedCells,
                draggingStartCell,
            })}
        }
        onMouseMove={(e)=> {
            const rect = (e.target as HTMLElement).getBoundingClientRect()
            if (e.clientY > rect.bottom - edgeThreshold && e.clientY <= rect.bottom) {
                (e.target as HTMLElement).style.cursor = "row-resize"
            }
            else {
                (e.target as HTMLElement).style.cursor = "pointer"
            }
        }}
        onContextMenu={onContextMenu}
        >
            {rowIndex + 1}
        </td>
    )
}

export default RowCell
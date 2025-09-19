import { useEffect, useState } from "react"
import { checkIsInsideSelectedCells } from "../../../Spreadsheet.util"
import { columnDragging, columnStartDragging } from "./ColumnCell.event"
import type { ColumnCellProps, ResizingColumn } from "./ColumnCell.interface"

const ColumnCell = ({
    columnIndex,
    spreadsheetData,
    onChange,
    isDragging,
    setIsDragging,
    draggingStartCell,
    setDraggingStartCell,
    selectedCells,
    setSelectedCells,
    cells,
    edgeThreshold,
    contextMenuRef,
    setIsContextMenuOpen,
}: ColumnCellProps) => {

    const isInsideSelectedCells = checkIsInsideSelectedCells({
        coordinate: { x: columnIndex, y: selectedCells.start.y },
        selectedCells
    })

    const [isResizingColumn, setIsResizingColumn] = useState<boolean>(false)
    const [resizingColumn, setResizingColumn] = useState<ResizingColumn | null>(null)

    const startResizeColumn = (e: React.MouseEvent) => {
        setIsResizingColumn(true)
        setResizingColumn({
            x: columnIndex,
            startX: e.clientX,
            startWidth: spreadsheetData.cols_width[columnIndex],
        })
    }

    const resizeColumn = (e: MouseEvent) => {
        if (isResizingColumn && resizingColumn !== null) {
            const deltaX = e.clientX - resizingColumn.startX
            const newWidth = Math.max(25, resizingColumn?.startWidth + deltaX)
            onChange({
                ...spreadsheetData,
                cols_width: spreadsheetData.cols_width.map((w, i) => i === resizingColumn?.x ? newWidth : w)
            })
        }
    }

    const stopResizeColumn = () => {
        setIsResizingColumn(false)
        setResizingColumn(null)
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
            if (e.clientX > rect.right - edgeThreshold && e.clientX <= rect.right) {
                startResizeColumn(e)
            }
            else {
                columnStartDragging({
                    columnIndex,
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
        document.addEventListener("mousemove", resizeColumn);
        document.addEventListener("mouseup", stopResizeColumn);
        return () => {
            document.removeEventListener("mousemove", resizeColumn);
            document.removeEventListener("mouseup", stopResizeColumn);
        }
    }, [isResizingColumn])

    return (
        <td
        key={String.fromCharCode(65 + columnIndex)}
        style={{
            backgroundColor: (
                checkIsInsideSelectedCells({
                    coordinate: {
                        x: columnIndex,
                        y: selectedCells.start.y, // any start - end
                    }, selectedCells,
                })
            ) ? "#dcdcdc" : "#f3f3f3"
        }}
        onMouseDown={onMouseDown}
        onMouseOver={() => {
            if (isResizingColumn) return
            columnDragging({
                columnIndex,
                cells,
                isDragging,
                setSelectedCells,
                draggingStartCell,
            })}
        }
        onMouseMove={(e)=> {
            const rect = (e.target as HTMLElement).getBoundingClientRect()
            if (e.clientX > rect.right - edgeThreshold && e.clientX <= rect.right) {
                (e.target as HTMLElement).style.cursor = "col-resize"
            }
            else {
                (e.target as HTMLElement).style.cursor = "pointer"
            }
        }}
        onContextMenu={onContextMenu}
        >
            {`${String.fromCharCode(65 + columnIndex)}`}
        </td>
    )
}

export default ColumnCell
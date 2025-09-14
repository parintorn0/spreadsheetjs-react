import { useEffect, useRef } from "react"
import { checkIsInsideSelectedCells, isSameCoordinate } from "../../Spreadsheet.util"
import { cellDoubleClick, cellDragging, cellStartDragging, cellValueChanged } from "./Cell.event"
import type { CellProps } from "./Cell.interface"
import React from "react"

const Cell = ({
    cell,
    coordinate,
    cells,
    editingCell,
    setEditingCell,
    setSpreadsheetData,
    isDragging,
    setIsDragging,
    draggingStartCell,
    setDraggingStartCell,
    selectedCells,
    setSelectedCells,
    height,
    width,
}: CellProps) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const { value, style } = cell

    const isInsideSelectedCells = checkIsInsideSelectedCells({coordinate, selectedCells})
    const isDraggingStartCell = isSameCoordinate(coordinate, draggingStartCell)

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus()
        }
    }, [editingCell])

    return (
        <td
        colSpan={cell.expand_x || 1}
        rowSpan={cell.expand_y || 1}
        style={{
            fontWeight: (style?.text_bold && "bold") || "normal",
            textAlign: (style?.text_align as React.CSSProperties['textAlign']) || "left",
            verticalAlign: (style?.text_vertical_align as React.CSSProperties['verticalAlign']) ?? "middle",
            backgroundColor: (style?.background_color as React.CSSProperties['backgroundColor']) ?? (
                isInsideSelectedCells && !isDraggingStartCell
            ) ? "#f3f3f3" : "#ffffff",
            borderTop: (style?.border?.top && (
                `${style.border.top.width}px ${style.border.top.style} ${style.border.top.color}`
            )) || (
                isInsideSelectedCells ? (
                    "1px solid black"
                ) : (
                    "1px solid #ccc"
                )
            ),
            borderLeft: (style?.border?.left && (
                `${style.border.left.width}px ${style.border.left.style} ${style.border.left.color}`
            )) || (
                isInsideSelectedCells ? (
                    "1px solid black"
                ) : (
                    "1px solid #ccc"
                )
            ),
            borderBottom: (style?.border?.bottom && (
                `${style.border.bottom.width}px ${style.border.bottom.style} ${style.border.bottom.color}`
            )) || (
                isInsideSelectedCells ? (
                    "1px solid black"
                ) : (
                    "1px solid transparent"
                )
            ),
            borderRight: (style?.border?.right && (
                `${style.border.right.width}px ${style.border.right.style} ${style.border.right.color}`
            )) || (
                isInsideSelectedCells ? (
                    "1px solid black"
                ) : (
                    "1px solid transparent"
                )
            ),
            boxShadow: isInsideSelectedCells ? "-1px -1px 0px #ccc": "",
            ...(cell?.from && {
                display: "none",
            }),
            height: `${height-2}px`,
            width: `${width-2}px`,
        }}
        onDoubleClick={()=>cellDoubleClick({setEditingCell, coordinate})}
        onMouseDown={(e) => cellStartDragging({
            e,
            editingCell,
            coordinate,
            cells,
            setIsDragging,
            setDraggingStartCell,
            setSelectedCells,
        })}
        onMouseMove={() => cellDragging({
            coordinate,
            cells,
            isDragging,
            setSelectedCells,
            draggingStartCell,
        })}
        >
            {isSameCoordinate(coordinate, editingCell) ? (
                <input
                ref={inputRef}
                type="text"
                value={value}
                style={{
                    height: `${height-2}px`,
                    width: `${width-2}px`,
                }}
                onChange={(e) => cellValueChanged({
                    value: e.target.value,
                    setSpreadsheetData,
                    coordinate,
                })}
                onBlur={()=>setEditingCell(null)}
                />
            ) : (
                value
            ) }
        </td>
    )
}

export default Cell
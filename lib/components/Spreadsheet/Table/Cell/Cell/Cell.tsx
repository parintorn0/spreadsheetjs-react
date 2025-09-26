import Class from './Cell.module.css'

import { useEffect, useRef } from "react"
import { checkIsInsideSelectedCells, isSameCoordinate } from "../../../Spreadsheet.util"
import { cellDoubleClick, cellDragging, cellStartDragging, cellValueChanged } from "./Cell.event"
import type { CellProps } from "./Cell.interface"

const Cell = ({
    cell,
    coordinate,
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
    contextMenuRef,
    setIsContextMenuOpen,
}: CellProps) => {

    const inputRef = useRef<HTMLInputElement>(null)

    const { value, style } = cell
    const { rows_height, cols_width } = spreadsheetData
    const height = rows_height.reduce((acc, h, i) => ((
        i >= coordinate.y && i < coordinate.y + (cell.expand_y || 1)
    ) ? acc + h : acc), 0)
    const width = cols_width.reduce((acc, w, i) => ((
        i >= coordinate.x && i < coordinate.x + (cell.expand_x || 1)
    ) ? acc + w : acc), 0)

    const isInsideSelectedCells = checkIsInsideSelectedCells({coordinate, selectedCells})
    const isDraggingStartCell = isSameCoordinate(coordinate, draggingStartCell)

    const onMouseDown = (e: React.MouseEvent<HTMLTableCellElement>) => {
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
            cellStartDragging({
                coordinate,
                spreadsheetData,
                setIsDragging,
                setDraggingStartCell,
                setSelectedCells,
            })
        }
    }

    const onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        contextMenuRef.current?.style.setProperty("top", `${e.clientY}px`)
        contextMenuRef.current?.style.setProperty("left", `${e.clientX}px`)
        setIsContextMenuOpen(true)
    }

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus()
        }
    }, [editingCell])

    const backgroundColor = style?.background_color
    const borderTop = style?.border?.top && (
        `${style.border.top.width}px ${style.border.top.style} rgba(${style.border.top.color.r}, ${style.border.top.color.g}, ${style.border.top.color.b}, ${style.border.top.color.a})`
    ) || (
        isInsideSelectedCells ? (
            "1px solid black"
        ) : (
            "1px solid #ccc"
        )
    )
    const borderLeft = style?.border?.left && (
        `${style.border.left.width}px ${style.border.left.style} rgba(${style.border.left.color.r}, ${style.border.left.color.g}, ${style.border.left.color.b}, ${style.border.left.color.a})`
    ) || (
        isInsideSelectedCells ? (
            "1px solid black"
        ) : (
            "1px solid #ccc"
        )
    )
    const borderBottom = style?.border?.bottom && (
        `${style.border.bottom.width}px ${style.border.bottom.style} rgba(${style.border.bottom.color.r}, ${style.border.bottom.color.g}, ${style.border.bottom.color.b}, ${style.border.bottom.color.a})`
    ) || (
        isInsideSelectedCells ? (
            "1px solid black"
        ) : (
            cell.expand_y && spreadsheetData.cells[coordinate.y + cell.expand_y - 1][coordinate.x].style?.border?.bottom ? (
                `${
                    spreadsheetData.cells[coordinate.y + cell.expand_y - 1][coordinate.x].style?.border?.bottom?.width
                }px ${
                    spreadsheetData.cells[coordinate.y + cell.expand_y - 1][coordinate.x].style?.border?.bottom?.style
                } rgba(${
                    spreadsheetData.cells[coordinate.y + cell.expand_y - 1][coordinate.x].style?.border?.bottom?.color.r
                }, ${
                    spreadsheetData.cells[coordinate.y + cell.expand_y - 1][coordinate.x].style?.border?.bottom?.color.g
                }, ${
                    spreadsheetData.cells[coordinate.y + cell.expand_y - 1][coordinate.x].style?.border?.bottom?.color.b
                }, ${
                    spreadsheetData.cells[coordinate.y + cell.expand_y - 1][coordinate.x].style?.border?.bottom?.color.a
                })`
            ) : (
                "1px solid transparent"
            )
        )
    )
    const borderRight = style?.border?.right && (
        `${style.border.right.width}px ${style.border.right.style} rgba(${style.border.right.color.r}, ${style.border.right.color.g}, ${style.border.right.color.b}, ${style.border.right.color.a})`
    ) || (
        isInsideSelectedCells ? (
            "1px solid black"
        ) : (
            cell.expand_x && spreadsheetData.cells[coordinate.y][coordinate.x + cell.expand_x - 1].style?.border?.right ? (
                `${
                    spreadsheetData.cells[coordinate.y][coordinate.x + cell.expand_x - 1].style?.border?.right?.width
                }px ${
                    spreadsheetData.cells[coordinate.y][coordinate.x + cell.expand_x - 1].style?.border?.right?.style
                } rgba(${
                    spreadsheetData.cells[coordinate.y][coordinate.x + cell.expand_x - 1].style?.border?.right?.color.r
                }, ${
                    spreadsheetData.cells[coordinate.y][coordinate.x + cell.expand_x - 1].style?.border?.right?.color.g
                }, ${
                    spreadsheetData.cells[coordinate.y][coordinate.x + cell.expand_x - 1].style?.border?.right?.color.b
                }, ${
                    spreadsheetData.cells[coordinate.y][coordinate.x + cell.expand_x - 1].style?.border?.right?.color.a
                })`
            ) : (
                "1px solid transparent"
            )
        )
    )

    return (
        <td
        className={`${
            Class.cell
        } ${
            (style?.text_bold && "font-bold") || ""
        } ${
            (style?.text_align && `text-${style.text_align}`) || ""
        } ${
            (style?.text_vertical_align && `text-${style.text_vertical_align}`) || ""
        } ${
            isInsideSelectedCells && "selected" || ""
        } ${
            cell?.from && "hidden" || ""
        }`}
        colSpan={cell.expand_x || 1}
        rowSpan={cell.expand_y || 1}
        style={{
            fontSize: style?.font_size ? `${style.font_size}px` : "14px",
            backgroundColor: (style?.background_color) ? (
                `rgba(${backgroundColor?.r}, ${backgroundColor?.g}, ${backgroundColor?.b}, ${backgroundColor?.a})`
            ) : (
                isInsideSelectedCells && !isDraggingStartCell
            ) ? "#f3f3f3" : "#ffffff",
            color: (style?.font_color) ? (
                `rgba(${style.font_color.r}, ${style.font_color.g}, ${style.font_color.b}, ${style.font_color.a})`
            ): "#000000",
            borderTop,
            borderLeft,
            borderBottom,
            borderRight,
            height: `${height-2}px`,
            width: `${width-2}px`,
        }}
        onDoubleClick={() => cellDoubleClick({setEditingCell, coordinate})}
        onMouseDown={onMouseDown}
        onMouseMove={() => cellDragging({
            coordinate,
            spreadsheetData,
            isDragging,
            setSelectedCells,
            draggingStartCell,
        })}
        onContextMenu={onContextMenu}
        >
            {isSameCoordinate(coordinate, editingCell) ? (
                <input
                ref={inputRef}
                type="text"
                value={value}
                style={{
                    height: `${height-2}px`,
                    width: `${width-4}px`,
                    fontSize: style?.font_size ? `${style.font_size}px` : "14px",
                }}
                onChange={(e) => cellValueChanged({
                    value: e.target.value,
                    spreadsheetData,
                    onChange,
                    coordinate,
                })}
                onBlur={()=>setEditingCell(null)}
                />
            ) : (
                value
            )}
        </td>
    )
}

export default Cell
import SharedClass from "../../Cell/Cell.shared.module.css"
import { deleteColumn, deleteRow, insertColumn, insertRow } from "../../Table.event"
import type { CellMenuProps } from "./CellMenu.interface"

const CellMenu = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    draggingStartCell,
    setDraggingStartCell,
    contextMenuRef,
    isContextMenuOpen,
    setIsContextMenuOpen,
    appendCellMenus = [],
}: CellMenuProps) => {
    const { rows_height, cols_width } = spreadsheetData
    const canDeleteRow = selectedCells.end.y - selectedCells.start.y + 1 <  rows_height.length
    const canDeleteColumn = selectedCells.end.x - selectedCells.start.x + 1 <  cols_width.length
    const isSingleRowSelected = selectedCells.start.y === selectedCells.end.y
    const isSingleColumnSelected = selectedCells.start.x === selectedCells.end.x

    return (
        <div
        ref={contextMenuRef}
        className={`${SharedClass.contextMenu} ${isContextMenuOpen ? SharedClass.open : ""}`}
        >
            <button
            onClick={() => {
                insertRow({
                    spreadsheetData,
                    onChange,
                    selectedCells,
                    setSelectedCells,
                    setDraggingStartCell,
                })
                setIsContextMenuOpen(false)
            }}
            >
                Insert Row Above {isSingleRowSelected ? "This Row" : "These Rows"}
            </button>
            <button
            onClick={() => {
                insertRow({
                    spreadsheetData,
                    onChange,
                    selectedCells,
                    setSelectedCells,
                    setDraggingStartCell,
                    after: true,
                })
                setIsContextMenuOpen(false)
            }}
            >
                Insert Row Below {isSingleRowSelected ? "This Row" : "These Rows"}
            </button>
            <button
            onClick={() => {
                insertColumn({
                    spreadsheetData,
                    onChange,
                    selectedCells,
                    setSelectedCells,
                    setDraggingStartCell,
                })
                setIsContextMenuOpen(false)
            }}
            >
                Insert Column Before {isSingleColumnSelected ? "This Column" : "These Columns"}
            </button>
            <button
            onClick={() => {
                insertColumn({
                    spreadsheetData,
                    onChange,
                    selectedCells,
                    setSelectedCells,
                    setDraggingStartCell,
                    after: true,
                })
                setIsContextMenuOpen(false)
            }}
            >
                Insert Column After {isSingleColumnSelected ? "This Column" : "These Columns"}
            </button>
            {canDeleteColumn && (
                <button
                onClick={() => {
                    deleteColumn({
                        spreadsheetData,
                        onChange,
                        selectedCells,
                        setSelectedCells,
                        setDraggingStartCell,
                    })
                    setIsContextMenuOpen(false)
                }}
                >
                    Delete {isSingleColumnSelected ? "This Column" : "These Columns"}
                </button>
            )}
            {canDeleteRow && (
                <button
                onClick={() => {
                    deleteRow({
                        spreadsheetData,
                        onChange,
                        selectedCells,
                        setSelectedCells,
                        setDraggingStartCell,
                    })
                    setIsContextMenuOpen(false)
                }}
                >
                    Delete {isSingleRowSelected ? "This Row" : "These Rows"}
                </button>
            )}
            {appendCellMenus.map(({label, onClick}, index) => (
                <button
                    key={index}
                    onClick={() => {
                        onClick(spreadsheetData, draggingStartCell, selectedCells)
                        setIsContextMenuOpen(false)
                    }}
                >
                    {label}
                </button>
            ))}
        </div>
    )
}

export default CellMenu
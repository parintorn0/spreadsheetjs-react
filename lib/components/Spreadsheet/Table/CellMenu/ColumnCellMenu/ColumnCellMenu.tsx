import SharedClass from "../../Cell/Cell.shared.module.css"
import { deleteColumn } from "../../Table.event"
import type { ColumnCellMenuProps } from "./ColumnCellMenu.interface"

const ColumnCellMenu = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
    isContextMenuOpen,
    setIsContextMenuOpen,
    contextMenuRef,
}: ColumnCellMenuProps) => {
    const { cols_width } = spreadsheetData
    const canDeleteColumn = selectedCells.end.x - selectedCells.start.x + 1 < cols_width.length
    const isSingleColumnSelected = selectedCells.start.x === selectedCells.end.x

    return canDeleteColumn && (
        <div
        ref={contextMenuRef}
        className={`${SharedClass.contextMenu} ${isContextMenuOpen ? SharedClass.open : ""}`}
        >
            <button
            onClick={() => {
                setIsContextMenuOpen(false)
                deleteColumn({
                    spreadsheetData,
                    onChange,
                    selectedCells,
                    setSelectedCells,
                    setDraggingStartCell,
                })
            }}
            >
                Delete {isSingleColumnSelected ? "This Column" : "These Columns"}
            </button>
        </div>
    )
}

export default ColumnCellMenu
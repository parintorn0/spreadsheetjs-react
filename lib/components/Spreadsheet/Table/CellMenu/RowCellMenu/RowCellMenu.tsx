import SharedClass from "../../Cell/Cell.shared.module.css"
import { deleteRow } from "../../Table.event"
import type { RowCellMenuProps } from "./RowCellMenu.interface"

const RowCellMenu = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
    isContextMenuOpen,
    setIsContextMenuOpen,
    contextMenuRef,
}: RowCellMenuProps) => {
    const { rows_height } = spreadsheetData
    const canDeleteRow = selectedCells.end.y - selectedCells.start.y + 1 < rows_height.length
    const isSingleRowSelected = selectedCells.start.y === selectedCells.end.y
    
    return canDeleteRow && (
        <div
        ref={contextMenuRef}
        className={`${SharedClass.contextMenu} ${isContextMenuOpen ? SharedClass.open : ""}`}
        >
            <button
            onClick={() => {
                setIsContextMenuOpen(false)
                deleteRow({
                    spreadsheetData,
                    onChange,
                    selectedCells,
                    setSelectedCells,
                    setDraggingStartCell,
                })
            }}
            >
                Delete {isSingleRowSelected ? "This Row" : "These Rows"}
            </button>
        </div>
    )
}

export default RowCellMenu
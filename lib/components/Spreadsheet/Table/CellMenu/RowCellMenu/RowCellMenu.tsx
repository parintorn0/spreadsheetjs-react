import SharedClass from "../../Cell/Cell.shared.module.css"
import { deleteRow, resizeRow, resizeRowPrompt } from "../../Table.event"
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
    overrideResizeRowPrompt,
}: RowCellMenuProps) => {
    const { rows_height } = spreadsheetData
    const canDeleteRow = selectedCells.end.y - selectedCells.start.y + 1 < rows_height.length
    const isSingleRowSelected = selectedCells.start.y === selectedCells.end.y
    
    return (
        <>
            <div
            ref={contextMenuRef}
            className={`${SharedClass.contextMenu} ${isContextMenuOpen ? SharedClass.open : ""}`}
            >
                {canDeleteRow && (
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
                )}
                <button
                onClick={async () => {
                    setIsContextMenuOpen(false)
                    const height = overrideResizeRowPrompt ? await overrideResizeRowPrompt() : resizeRowPrompt()
                    if(height!==null) {
                        resizeRow({
                            spreadsheetData,
                            onChange,
                            selectedCells,
                            height,
                        })
                    }
                }}
                >
                    Resize {isSingleRowSelected ? "This Row" : "These Rows"}
                </button>
            </div>
        </>
    )
}

export default RowCellMenu
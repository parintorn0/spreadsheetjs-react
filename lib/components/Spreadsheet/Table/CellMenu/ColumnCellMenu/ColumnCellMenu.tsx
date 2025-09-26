import SharedClass from "../../Cell/Cell.shared.module.css"
import { deleteColumn, resizeColumn, resizeColumnPrompt } from "../../Table.event"
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
    overrideResizeColumnPrompt,
}: ColumnCellMenuProps) => {
    const { cols_width } = spreadsheetData
    const canDeleteColumn = selectedCells.end.x - selectedCells.start.x + 1 < cols_width.length
    const isSingleColumnSelected = selectedCells.start.x === selectedCells.end.x

    return (
        <>
            <div
            ref={contextMenuRef}
            className={`${SharedClass.contextMenu} ${isContextMenuOpen ? SharedClass.open : ""}`}
            >
                {canDeleteColumn && (
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
                )}
                <button
                onClick={async () => {
                    setIsContextMenuOpen(false)
                    const width = overrideResizeColumnPrompt ? await overrideResizeColumnPrompt() : resizeColumnPrompt()
                    if(width!==null) {
                        resizeColumn({
                            spreadsheetData,
                            onChange,
                            selectedCells,
                            width,
                        })
                    }
                }}
                >
                    Resize {isSingleColumnSelected ? "This Column" : "These Columns"}
                </button>
            </div>
        </>
    )
}

export default ColumnCellMenu
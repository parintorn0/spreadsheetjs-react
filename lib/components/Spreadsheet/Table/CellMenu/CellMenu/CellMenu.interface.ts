import type { AppendCellMenu, Coordinate, SelectedCells, SpreadsheetData } from "../../../Spreadsheet.interface";

export interface CellMenuProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
    draggingStartCell: Coordinate,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    contextMenuRef: React.RefObject<HTMLDivElement>,
    isContextMenuOpen: boolean,
    setIsContextMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    canInsertRowAbove: boolean,
    canInsertRowBelow: boolean,
    canDeleteRow: boolean,
    canInsertColumnBefore: boolean,
    canInsertColumnAfter: boolean,
    canDeleteColumn: boolean,
    appendCellMenu?: Array<AppendCellMenu>
    disableDefaultCellMenu?: boolean,
}

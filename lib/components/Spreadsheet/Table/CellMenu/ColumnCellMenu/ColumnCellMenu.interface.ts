
import type { AppendCellMenu, Coordinate, SelectedCells, SpreadsheetData } from "../../../Spreadsheet.interface";

export interface ColumnCellMenuProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
    draggingStartCell: Coordinate,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    contextMenuRef: React.RefObject<HTMLDivElement>,
    isContextMenuOpen: boolean,
    setIsContextMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    overrideResizeColumnPrompt?: () => Promise<number | null>,
    appendColumnCellMenu?: Array<AppendCellMenu>
    disableDefaultColumnCellMenu?: boolean,
}

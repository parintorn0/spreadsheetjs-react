import type { Coordinate, SelectedCells, SpreadsheetData } from "../../../Spreadsheet.interface";

export interface CellMenuProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    contextMenuRef: React.RefObject<HTMLDivElement>,
    isContextMenuOpen: boolean,
    setIsContextMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
}
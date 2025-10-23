import type {CellData, Coordinate, Image, SelectedCells, SpreadsheetData} from "../../../Spreadsheet.interface"

export interface CellProps {
    cell: CellData,
    coordinate: Coordinate,
    editingCell: Coordinate | null,
    spreadsheetData: SpreadsheetData,
    viewOnlyMode: boolean,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    setEditingCell: React.Dispatch<React.SetStateAction<Coordinate | null>>,
    isDragging: boolean,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    draggingStartCell: Coordinate,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
    contextMenuRef: React.RefObject<HTMLDivElement>,
    setIsContextMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    preAddImage?: (blob: Blob) => Promise<Image | null>,
}
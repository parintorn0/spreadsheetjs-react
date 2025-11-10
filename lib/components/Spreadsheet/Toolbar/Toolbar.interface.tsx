import type {AppendToolbarSection, Coordinate, Image, SelectedCells, SpreadsheetData} from "../Spreadsheet.interface";

export interface ToolbarProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
    draggingStartCell: Coordinate,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    preAddImage?: (blob: Blob) => Promise<Image | null>,
    appendToolbar?: Array<AppendToolbarSection>,
    disableDefaultToolbar?: boolean,
    canInsertRowAbove: boolean,
    canInsertRowBelow: boolean,
    canDeleteRow: boolean,
    canInsertColumnBefore: boolean,
    canInsertColumnAfter: boolean,
    canDeleteColumn: boolean,
}

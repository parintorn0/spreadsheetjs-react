import type { Coordinate, SelectedCells, SpreadsheetData } from "../../../Spreadsheet.interface";


export interface CellDoubleClickProps {
    setEditingCell: React.Dispatch<React.SetStateAction<Coordinate | null>>,
    coordinate: Coordinate,
}

export interface CellValueChangedProps {
    value?: string,
    imgPath?: string,
    imgBlob?: Blob,
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    coordinate: Coordinate
}

export interface CellStartDraggingProps {
    coordinate: Coordinate,
    spreadsheetData: SpreadsheetData,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
}

export interface CellDraggingProps {
    coordinate: Coordinate,
    spreadsheetData: SpreadsheetData,
    isDragging: boolean,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
    draggingStartCell: Coordinate,
}
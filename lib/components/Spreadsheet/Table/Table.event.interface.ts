import type { CellData, Coordinate, SelectedCells, SpreadsheetData } from "../Spreadsheet.interface";

export interface StartDraggingPropsStructure {
    cells: Array<Array<CellData>>,
    setIsDragging: React.Dispatch<React.SetStateAction<boolean>>,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
}

export interface StartDraggingProps extends StartDraggingPropsStructure {
    selectedCells: SelectedCells,
}
export interface AllStartDraggingProps extends StartDraggingPropsStructure {}

export interface DraggingPropsStructure {
    cells: Array<Array<CellData>>,
    isDragging: boolean,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
}
export interface DraggingProps extends DraggingPropsStructure {
    selectedCells: SelectedCells,
}
export interface AllDraggingProps extends DraggingPropsStructure {}

interface CellManagementProps {
    spreadsheetData: SpreadsheetData,
    onChange: (data: SpreadsheetData) => void,
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
}

export interface InsertRowProps extends CellManagementProps {
    after?: boolean,
}

export interface InsertColumnProps extends CellManagementProps {
    after?: boolean,
}

export interface DeleteColumnProps extends CellManagementProps {}

export interface DeleteRowProps extends CellManagementProps {}
import type { SpreadsheetData, SelectedCells, Coordinate} from "./Spreadsheet.interface"


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

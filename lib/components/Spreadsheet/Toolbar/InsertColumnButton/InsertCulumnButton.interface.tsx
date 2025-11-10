import type { Coordinate, SelectedCells, SpreadsheetData } from "../../Spreadsheet.interface";

interface InsertColumnButtonProps {
    spreadsheetData: SpreadsheetData
    onChange: (spreadsheetData: SpreadsheetData) => void
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>
    setDraggingStartCell:  React.Dispatch<React.SetStateAction<Coordinate>>
}

export interface InsertColumnBeforeButtonProps extends InsertColumnButtonProps {
    canInsertRowBefore: boolean,
}

export interface InsertColumnAfterButtonProps extends InsertColumnButtonProps {
    canInsertRowAfter: boolean,
}

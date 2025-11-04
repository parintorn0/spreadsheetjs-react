import type { Coordinate, SelectedCells, SpreadsheetData } from "../../Spreadsheet.interface";

interface InsertRowButtonProps {
    spreadsheetData: SpreadsheetData
    onChange: (spreadsheetData: SpreadsheetData) => void
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>
    setDraggingStartCell:  React.Dispatch<React.SetStateAction<Coordinate>>
}

export interface InsertRowBeforeButtonProps extends InsertRowButtonProps {}

export interface InsertRowAfterButtonProps extends InsertRowButtonProps {}

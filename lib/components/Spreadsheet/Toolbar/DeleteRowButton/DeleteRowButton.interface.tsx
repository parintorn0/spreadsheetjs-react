import type { Coordinate, SelectedCells, SpreadsheetData } from "../../Spreadsheet.interface";

export interface DeleteRowButtonProps {
    spreadsheetData: SpreadsheetData
    onChange: (spreadsheetData: SpreadsheetData) => void
    selectedCells: SelectedCells,
    setSelectedCells: React.Dispatch<React.SetStateAction<SelectedCells>>
    setDraggingStartCell:  React.Dispatch<React.SetStateAction<Coordinate>>
}

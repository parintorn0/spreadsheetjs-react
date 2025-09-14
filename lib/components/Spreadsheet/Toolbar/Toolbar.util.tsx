import type { CellData, SelectedCells, SpreadsheetData } from "../Spreadsheet.interface"
import { checkIsInsideSelectedCells, isSameCoordinate } from "../Spreadsheet.util"

interface MergeCells {
    spreadsheetData: SpreadsheetData,
    selectedCells: SelectedCells,
    setSpreadsheetData: React.Dispatch<React.SetStateAction<SpreadsheetData>>
}

export const mergeCells = ({
    spreadsheetData,
    selectedCells,
    setSpreadsheetData,
}: MergeCells) => {
    const hadMergeCell = spreadsheetData.cells.flat().some(val => (
        Object.hasOwn(val, "expand_x") ||
        Object.hasOwn(val, "expand_y") ||
        Object.hasOwn(val, "from")
    ))
    if(hadMergeCell) {
        setSpreadsheetData(prev=>({
            ...prev,
            cells: prev.cells.map(row => row.map(col => Object.fromEntries(
                    Object.entries(col).filter(([key]) => (
                        key !== "expand_x" &&
                        key !== "expand_y" &&
                        key !== "from"
                    ))
                ) as CellData))
        }))
    }
    else {
        const expandX = selectedCells.end.x - selectedCells.start.x + 1
        const expandY = selectedCells.end.y - selectedCells.start.y + 1
        setSpreadsheetData(prev=>({
            ...prev,
            cells: prev.cells.map((row, rowIndex) => row.map((col, colIndex) => (
                checkIsInsideSelectedCells({
                    coordinate: {
                        x: colIndex,
                        y: rowIndex,
                    },
                    selectedCells,
                })
            ) ? (
                isSameCoordinate({
                    x: selectedCells.start.x,
                    y: selectedCells.start.y,
                }, {
                    x: colIndex,
                    y: rowIndex,
                })
            ) ? {
                ...(Object.fromEntries(
                    Object.entries(col).filter(([key]) => (
                        key !== "expand_x" &&
                        key !== "expand_y" &&
                        key !== "from"
                    ))
                ) as CellData),
                ...(expandX !==1 ? {
                    expand_x: expandX
                } : {}),
                ...(expandY !==1 ? {
                    expand_y: expandY
                } : {}),
            } : {
                ...(Object.fromEntries(
                    Object.entries(col).filter(([key]) => (
                        key !== "expand_x" &&
                        key !== "expand_y" &&
                        key !== "from"
                    ))
                ) as CellData),
                from: {
                    x: selectedCells.start.x,
                    y: selectedCells.start.y,
                }
            } : col))
        }))
    }
}
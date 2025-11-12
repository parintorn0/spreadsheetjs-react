import type { Coordinate, SelectedCells, CellRange } from "./Spreadsheet.interface"

export const isSameCoordinate = (firstCoordinate: Coordinate| null, secondCoordinate: Coordinate | null): boolean => {
    if(firstCoordinate===null || secondCoordinate===null) {
        return false
    }
    else {
        return (
            firstCoordinate.x === secondCoordinate.x &&
            firstCoordinate.y === secondCoordinate.y
        )
    }
}

export const checkIsInsideSelectedCells = ({
    coordinate,
    selectedCells,
} : {
    coordinate: Coordinate,
    selectedCells: SelectedCells
}) : boolean => {
    return (
        selectedCells.start.x <= coordinate.x &&
        coordinate.x <= selectedCells.end.x &&
        selectedCells.start.y <= coordinate.y &&
        coordinate.y <= selectedCells.end.y
    )
}

const findSelectionMinX = ({
    selectedCells,
    mergedCells,
}: {
    selectedCells: SelectedCells,
    mergedCells: Array<CellRange>,
}): number => (
    Math.min(
        selectedCells.start.x,
        ...mergedCells.filter(mergeCellRange => Array.from<number>({
            length: selectedCells.end.y - selectedCells.start.y + 1
        }).some((_, index) => (
            mergeCellRange.start.x <= selectedCells.start.x &&
            selectedCells.start.x <= mergeCellRange.end.x &&
            mergeCellRange.start.y <= index + selectedCells.start.y &&
            index + selectedCells.start.y <= mergeCellRange.end.y
        ))).map(({start}) => start.x)
    )
)

const findSelectionMinY = ({
    selectedCells,
    mergedCells,
}: {
    selectedCells: SelectedCells,
    mergedCells: Array<CellRange>,
}): number => (
    Math.min(
        selectedCells.start.y,
        ...mergedCells.filter(mergeCellRange => Array.from<number>({
            length: selectedCells.end.x - selectedCells.start.x + 1
        }).some((_, index) => (
            mergeCellRange.start.x <= index + selectedCells.start.x &&
            index + selectedCells.start.x <= mergeCellRange.end.x &&
            mergeCellRange.start.y <= selectedCells.start.y &&
            selectedCells.start.y <= mergeCellRange.end.y
        ))).map(({start}) => start.y)
    )
)

const findSelectionMaxX = ({
    selectedCells,
    mergedCells,
}: {
    selectedCells: SelectedCells,
    mergedCells: Array<CellRange>,
}): number => {
    return Math.max(
        selectedCells.end.x,
        ...mergedCells.filter(mergeCellRange => Array.from<number>({
            length: selectedCells.end.y - selectedCells.start.y + 1
        }).some((_, index) => (
            mergeCellRange.start.x <= selectedCells.end.x &&
            selectedCells.end.x <= mergeCellRange.end.x &&
            mergeCellRange.start.y <= index + selectedCells.start.y &&
            index + selectedCells.start.y <= mergeCellRange.end.y
        ))).map(({end}) => end.x)
    )
}

const findSelectionMaxY = ({
    selectedCells,
    mergedCells,
}: {
    selectedCells: SelectedCells,
    mergedCells: Array<CellRange>,
}): number => (
    Math.max(
        selectedCells.end.y,
        ...mergedCells.filter(mergeCellRange => Array.from<number>({
            length: selectedCells.end.x - selectedCells.start.x + 1
        }).some((_, index) => (
            mergeCellRange.start.x <= index + selectedCells.start.x &&
            index + selectedCells.start.x <= mergeCellRange.end.x &&
            mergeCellRange.start.y <= selectedCells.end.y &&
            selectedCells.end.y <= mergeCellRange.end.y
        ))).map(({end}) => end.y)
    )
)

export const findSelection = ({
    selectedCells,
    mergedCells,
}: {
    selectedCells: SelectedCells,
    mergedCells: Array<CellRange>,
}): SelectedCells => {
    const newStartX = findSelectionMinX({
        selectedCells,
        mergedCells,
    })
    const newStartY = findSelectionMinY({
        selectedCells,
        mergedCells,
    })
    const newEndX = findSelectionMaxX({
        selectedCells,
        mergedCells,
    })
    const newEndY = findSelectionMaxY({
        selectedCells,
        mergedCells,
    })
    if (
        newStartX === selectedCells.start.x &&
        newStartY === selectedCells.start.y &&
        newEndX === selectedCells.end.x &&
        newEndY === selectedCells.end.y
    ) {
        return {
            start: {
                x: selectedCells.start.x,
                y: selectedCells.start.y,
            },
            end: {
                x: selectedCells.end.x,
                y: selectedCells.end.y,
            }
        }
    }
    else {
        return findSelection({
            selectedCells: {
                start: {
                    x: newStartX,
                    y: newStartY,
                },
                end: {
                    x: newEndX,
                    y: newEndY,
                },
            },
            mergedCells,
        })
    }
}

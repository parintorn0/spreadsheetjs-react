import type { CellData, Coordinate, SelectedCells } from "./Spreadsheet.interface"

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
    cells,
}: {
    selectedCells: SelectedCells,
    cells: Array<Array<CellData>>,
}): number => {
    const newStartX = cells.reduce((
        min, r, ri
    ) => (
        selectedCells.start.y <= ri && ri <= selectedCells.end.y
    ) ? (
        Math.min(min, ...r.map((c, ci) => (
            selectedCells.start.x <= ci && ci <= selectedCells.end.x
        ) ? (
            c.from ? c.from.x : selectedCells.start.x
        ): selectedCells.start.x))
    ) : min, selectedCells.start.x)
    if(selectedCells.start.x === newStartX){
        return selectedCells.start.x
    }
    return findSelectionMinX({
        selectedCells: {
            start: {
                x: newStartX,
                y: selectedCells.start.y,
            },
            end: {
                x: selectedCells.end.x,
                y: selectedCells.end.y,
            },
        },
        cells,
    })
}

const findSelectionMinY = ({
    selectedCells,
    cells,
}: {
    selectedCells: SelectedCells,
    cells: Array<Array<CellData>>,
}): number => {
    const newStartY = cells.reduce((
        min, r, ri
    ) => (
        selectedCells.start.y <= ri && ri <= selectedCells.end.y
    ) ? (
        Math.min(min, ...r.map((c, ci) => (
            selectedCells.start.x <= ci && ci <= selectedCells.end.x
        ) ? (
            c.from ? c.from.y : selectedCells.start.y
        ): selectedCells.start.y))
    ) : min, selectedCells.start.y)
    if(selectedCells.start.y === newStartY){
        return selectedCells.start.y
    }
    return findSelectionMinY({
        selectedCells: {
            start: {
                x: selectedCells.start.x,
                y: newStartY,
            },
            end: {
                x: selectedCells.end.x,
                y: selectedCells.end.y,
            },
        },
        cells,
    })
}

const findSelectionMaxX = ({
    selectedCells,
    cells,
}: {
    selectedCells: SelectedCells,
    cells: Array<Array<CellData>>,
}): number => {
    const newEndX = cells.reduce((
        max, r, ri
    ) => (
        selectedCells.start.y <= ri && ri <= selectedCells.end.y
    ) ? (
        Math.max(max, ...r.map((c, ci) => (
            selectedCells.start.x <= ci && ci <= selectedCells.end.x
        ) ? (
            ci + (c.expand_x || 1) - 1
        ): selectedCells.end.x))
    ) : max, selectedCells.end.x)
    if(selectedCells.end.x === newEndX){
        return selectedCells.end.x
    }
    return findSelectionMaxX({
        selectedCells: {
            start: {
                x: selectedCells.start.x,
                y: selectedCells.start.y,
            },
            end: {
                x: newEndX,
                y: selectedCells.end.y,
            },
        },
        cells,
    })
}

const findSelectionMaxY = ({
    selectedCells,
    cells,
}: {
    selectedCells: SelectedCells,
    cells: Array<Array<CellData>>,
}): number => {
    const newEndY = cells.reduce((
        max, r, ri
    ) => (
        selectedCells.start.y <= ri && ri <= selectedCells.end.y
    ) ? (
        Math.max(max, ...r.map((c, ci) => (
            selectedCells.start.x <= ci && ci <= selectedCells.end.x
        ) ? (
            ri + (c.expand_y || 1) - 1
        ): selectedCells.end.y))
    ) : max, selectedCells.end.y)
    if(selectedCells.end.y === newEndY){
        return selectedCells.end.y
    }
    return findSelectionMaxY({
        selectedCells: {
            start: {
                x: selectedCells.start.x,
                y: selectedCells.start.y,
            },
            end: {
                x: selectedCells.end.x,
                y: newEndY,
            },
        },
        cells,
    })
}

export const findSelection = ({
    selectedCells,
    cells,
}: {
    selectedCells: SelectedCells,
    cells: Array<Array<CellData>>,
}): SelectedCells => {
    const newStartX = findSelectionMinX({
        selectedCells,
        cells,
    })
    const newStartY = findSelectionMinY({
        selectedCells,
        cells,
    })
    const newEndX = findSelectionMaxX({
        selectedCells,
        cells,
    })
    const newEndY = findSelectionMaxY({
        selectedCells,
        cells,
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
            cells,
        })
    }
}
import type { Style, CellData, Border } from "../Spreadsheet.interface"
import type { DeleteImageProps, FontDecrementProps, FontIncrementProps, InsertImageProps, MergeCellsProps, SetBackgroundColorProps, SetBoldProps, SetBorderProps, SetFontColorProps, SetFontSizeProps, SetTextAlignProps, SetTextVerticalAlignProps } from "./Toolbar.util.interface"
import { checkIsInsideSelectedCells, isSameCoordinate } from "../Spreadsheet.util"

export const setTextAlign = ({
    spreadsheetData,
    onChange,
    selectedCells,
    align,
}: SetTextAlignProps) => {
    onChange(({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => (
            checkIsInsideSelectedCells({
                coordinate: {
                    x: colIndex,
                    y: rowIndex,
                },
                selectedCells,
            }) ? ({
                ...col,
                style: {
                    ...col.style,
                    text_align: align,
                },
            }) : col))
        )
    }))
}

export const setTextVerticalAlign = ({
    spreadsheetData,
    onChange,
    selectedCells,
    align,
}: SetTextVerticalAlignProps) => {
    onChange(({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => (
            checkIsInsideSelectedCells({
                coordinate: {
                    x: colIndex,
                    y: rowIndex,
                },
                selectedCells,
            }) ? ({
                ...col,
                style: {
                    ...col.style,
                    text_vertical_align: align,
                },
            }) : col))
        )
    }))
}

export const setBold = ({
    spreadsheetData,
    onChange,
    selectedCells,
    bold,
}: SetBoldProps) => {
    onChange({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => (
            checkIsInsideSelectedCells({
                coordinate: {
                    x: colIndex,
                    y: rowIndex,
                },
                selectedCells,
            }) ? ({
                ...col,
                style: {
                    ...col.style,
                    text_bold: bold,
                },
            }) : col))
        )
    })
}

export const setFontSize = ({
    spreadsheetData,
    onChange,
    selectedCells,
    fontSize,
}: SetFontSizeProps) => {
    onChange({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => (
            checkIsInsideSelectedCells({
                coordinate: {
                    x: colIndex,
                    y: rowIndex,
                },
                selectedCells,
            }) ? ({
                ...col,
                style: {
                    ...col.style,
                    font_size: fontSize,
                },
            }) : col))
        )
    })
}

export const setFontColor = ({
    spreadsheetData,
    onChange,
    selectedCells,
    color,
}: SetFontColorProps) => {
    onChange({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => (
            checkIsInsideSelectedCells({
                coordinate: {
                    x: colIndex,
                    y: rowIndex,
                },
                selectedCells,
            }) ? ({
                ...col,
                style: {
                    ...col.style,
                    font_color: color,
                },
            }) : col))
        )
    })
}

export const setBorder = ({
    spreadsheetData,
    onChange,
    selectedCells,
    borderType,
    borderWidth,
    borderStyle,
    borderColor,
}: SetBorderProps) => {
    switch(borderType) {
        case "top":
        case "left":
        case "right":
        case "bottom":
            onChange({
                ...spreadsheetData,
                cells: spreadsheetData.cells.map((
                    row, rowIndex
                ) => row.map((
                    col, colIndex
                ) => (
                    checkIsInsideSelectedCells({
                        coordinate: {
                            x: colIndex,
                            y: rowIndex,
                        },
                        selectedCells,
                    }) ? ({
                        ...col,
                        style: {
                            ...col.style,
                            border: {
                                ...col.style?.border,
                                [borderType]: {
                                    width: borderWidth,
                                    style: borderStyle,
                                    color: borderColor,
                                }
                            }
                        },
                    }) : col))
                )
            })
            break;
        case "all":
            const borderAll = {
                width: borderWidth,
                style: borderStyle,
                color: borderColor,
            }
            const border = {
                top: borderAll,
                right: borderAll,
                bottom: borderAll,
                left: borderAll,
            }
            onChange({
                ...spreadsheetData,
                cells: spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => (
                    checkIsInsideSelectedCells({
                        coordinate: {
                            x: colIndex,
                            y: rowIndex,
                        },
                        selectedCells,
                    }) ? ({
                        ...col,
                        style: {
                            ...col.style,
                            border,
                        },
                    }) : col))
                )
            })
            break
        case "none":
            onChange({
                ...spreadsheetData,
                cells: spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => (
                    checkIsInsideSelectedCells({
                        coordinate: {
                            x: colIndex,
                            y: rowIndex,
                        },
                        selectedCells,
                    }) ? ({
                        ...col,
                        style: Object.fromEntries(
                            Object.entries({...col.style}).filter(([key]) => (
                                key !== "border"
                            ))
                        ) as Style,
                    }) : col))
                )
            })
            break
        case "inside":
            onChange({
                ...spreadsheetData,
                cells: spreadsheetData.cells.map((
                    row, rowIndex
                ) => row.map((
                    col, colIndex
                ) => checkIsInsideSelectedCells({
                        coordinate: {
                            x: colIndex,
                            y: rowIndex,
                        },
                        selectedCells,
                    }) ? {
                        ...col,
                        style: {
                            ...col.style,
                            border: Object.fromEntries(
                                Object.entries({
                                    top: rowIndex !== selectedCells.start.y ? {
                                        width: borderWidth,
                                        style: borderStyle,
                                        color: borderColor,
                                    } : col.style?.border?.top,
                                    left: colIndex !== selectedCells.start.x ? {
                                        width: borderWidth,
                                        style: borderStyle,
                                        color: borderColor,
                                    } : col.style?.border?.left,
                                    right: colIndex !== selectedCells.end.x ? {
                                        width: borderWidth,
                                        style: borderStyle,
                                        color: borderColor,
                                    } : col.style?.border?.right,
                                    bottom: rowIndex !== selectedCells.end.y ? {
                                        width: borderWidth,
                                        style: borderStyle,
                                        color: borderColor,
                                    } : col.style?.border?.bottom,
                                }).filter(([_, value]) => value !== undefined)
                            ) as Border,
                        },
                    } : col)
                )
            })
            break
        case "outside":
            onChange({
                ...spreadsheetData,
                cells: spreadsheetData.cells.map((
                    row, rowIndex
                ) => row.map((
                    col, colIndex
                ) => (
                    checkIsInsideSelectedCells({
                        coordinate: {
                            x: colIndex,
                            y: rowIndex,
                        },
                        selectedCells,
                    }) ? {
                        ...col,
                        style: {
                            ...col.style,
                            border: Object.fromEntries(
                                Object.entries({
                                    top: rowIndex === selectedCells.start.y ? {
                                        width: borderWidth,
                                        style: borderStyle,
                                        color: borderColor,
                                    } : col.style?.border?.top,
                                    left: colIndex === selectedCells.start.x ? {
                                        width: borderWidth,
                                        style: borderStyle,
                                        color: borderColor,
                                    } : col.style?.border?.left,
                                    bottom: rowIndex === selectedCells.end.y ? {
                                        width: borderWidth,
                                        style: borderStyle,
                                        color: borderColor,
                                    } : col.style?.border?.bottom,
                                    right: colIndex === selectedCells.end.x ? {
                                        width: borderWidth,
                                        style: borderStyle,
                                        color: borderColor,
                                    } : col.style?.border?.right,
                                }).filter(([_, value]) => value !== undefined)
                            ) as Border,
                        },
                    } : col
                )))
            })
            break
        default:
            break;
    }
}

export const mergeCells = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setDraggingStartCell,
}: MergeCellsProps) => {
    const { cells, merged_cells } = spreadsheetData
    const inMergedCells = merged_cells.reduce<Array<number>>((arr, mergedCellRange, index) => {
        const normalizedMergedCells = {
            start: {
                x: Math.min(mergedCellRange.start.x, mergedCellRange.end.x),
                y: Math.min(mergedCellRange.start.y, mergedCellRange.end.y)
            },
            end: {
                x: Math.max(mergedCellRange.start.x, mergedCellRange.end.x),
                y: Math.max(mergedCellRange.start.y, mergedCellRange.end.y)
            }
        }
        const normalizedSelectedCells = {
            start: {
                x: Math.min(selectedCells.start.x, selectedCells.end.x),
                y: Math.min(selectedCells.start.y, selectedCells.end.y)
            },
            end: {
                x: Math.max(selectedCells.start.x, selectedCells.end.x),
                y: Math.max(selectedCells.start.y, selectedCells.end.y)
            }
        }
        const overlapStartX = Math.max(normalizedMergedCells.start.x, normalizedSelectedCells.start.x);
        const overlapStartY = Math.max(normalizedMergedCells.start.y, normalizedSelectedCells.start.y);
        const overlapEndX   = Math.min(normalizedMergedCells.end.x, normalizedSelectedCells.end.x);
        const overlapEndY   = Math.min(normalizedMergedCells.end.y, normalizedSelectedCells.end.y);
        if(overlapStartX < overlapEndX && overlapStartY < overlapEndY) {
            return [
                ...arr,
                index,
            ]
        }
        else {
            return arr
        }
    }, [])
    if(inMergedCells.length > 0) {
        onChange({
            ...spreadsheetData,
            merged_cells: [
                ...merged_cells.slice(0, inMergedCells[0]),
                ...merged_cells.slice(inMergedCells[0] + 1)
            ]
        })
    }
    else {
        onChange({
            ...spreadsheetData,
            merged_cells: [
                ...merged_cells,
                {
                    start: selectedCells.start,
                    end: selectedCells.end,
                }
            ]
        })
        setDraggingStartCell(selectedCells.start)
    }
}


export const setBackgroundColor = ({
    spreadsheetData,
    onChange,
    selectedCells,
    color,
}: SetBackgroundColorProps) => {
    onChange({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => (
            checkIsInsideSelectedCells({
                coordinate: {
                    x: colIndex,
                    y: rowIndex,
                },
                selectedCells,
            }) ? ({
                ...col,
                style: {
                    ...col.style,
                    background_color: color,
                },
            }) : col))
        )
    })
}

export const fontIncrement = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: FontIncrementProps) => {
    onChange({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => (
            checkIsInsideSelectedCells({
                coordinate: {
                    x: colIndex,
                    y: rowIndex,
                },
                selectedCells,
            }) ? ({
                ...col,
                style: {
                    ...col.style,
                    font_size: (col.style?.font_size ?? 14) + 1,
                },
            }) : col
        )))
    })
}

export const fontDecrement = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: FontDecrementProps) => {
    onChange({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => (
            checkIsInsideSelectedCells({
                coordinate: {
                    x: colIndex,
                    y: rowIndex,
                },
                selectedCells,
            }) ? ({
                ...col,
                style: {
                    ...col.style,
                    font_size: (col.style?.font_size ?? 14) - 1,
                },
            }) : col
        )))
    })
}

export const insertImage = ({
    spreadsheetData,
    onChange,
    selectedCells,
    preAddImage,
}: InsertImageProps) => {
    const inputElem = document.createElement("input")
    inputElem.type = "file"
    inputElem.accept = "image/*"
    inputElem.onchange = async () => {
        if(inputElem.files && inputElem.files[0]) {
            const file = inputElem.files[0]
            const blob = new Blob([file], { type: file.type })
            const image = preAddImage && await preAddImage(blob) || {
                blob,
                path: URL.createObjectURL(blob)
            }
            const newCells = spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => {
                if(
                    checkIsInsideSelectedCells({
                        coordinate: {
                            x: colIndex,
                            y: rowIndex,
                        },
                        selectedCells
                    })
                ) {
                    if(col.image?.path?.startsWith("blob:")) {
                        col.image.path && URL.revokeObjectURL(col.image.path)
                    }
                    return {
                        ...col,
                        image,
                    }
                }
                else {
                    return col
                }
            }))
            onChange({
                ...spreadsheetData,
                cells: newCells
            })
        }
    }
    inputElem.click()
}

export const deleteImage = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: DeleteImageProps) => {
    onChange({
        ...spreadsheetData,
        cells: spreadsheetData.cells.map((row, rowIndex) => (
            row.map((col, colIndex) => {
                if(
                    checkIsInsideSelectedCells({
                        coordinate: {
                            x: colIndex,
                            y: rowIndex,
                        },
                        selectedCells,
                    })
                ) {
                    if(col.image?.path?.startsWith("blob:")) {
                        URL.revokeObjectURL(col.image.path)
                    }
                    return Object.fromEntries(
                        Object.entries(col).filter(([key]) => (
                            key !== "image"
                        ))
                    ) as CellData
                }
                else {
                    return col
                }
            })
        ))
    })
}

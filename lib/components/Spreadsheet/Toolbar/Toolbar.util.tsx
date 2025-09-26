import type { Style, CellData, Border } from "../Spreadsheet.interface"
import type { FontDecrementProps, FontIncrementProps, MergeCellsProps, SetBackgroundColorProps, SetBoldProps, SetBorderProps, SetFontColorProps, SetFontSizeProps, SetTextAlignProps, SetTextVerticalAlignProps } from "./Toolbar.util.interface"
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
    const hadMergeCell = spreadsheetData.cells.some((row, rowIndex) => (
        row.some((col, colIndex) => (
            (
                Object.hasOwn(col, "expand_x") ||
                Object.hasOwn(col, "expand_y") ||
                Object.hasOwn(col, "from")
            ) && (
                checkIsInsideSelectedCells({
                    coordinate: {
                        x: colIndex,
                        y: rowIndex,
                    },
                    selectedCells,
                })
            )
        ))
    ))
    if(hadMergeCell) {
        onChange({
            ...spreadsheetData,
            cells: spreadsheetData.cells.map((row, rowIndex) => (
                row.map((col, colIndex) => (
                    checkIsInsideSelectedCells({
                        coordinate: {
                            x: colIndex,
                            y: rowIndex,
                        },
                        selectedCells,
                    }) ? (
                        Object.fromEntries(
                            Object.entries(col).filter(([
                                key
                            ]) => (
                                key !== "expand_x" &&
                                key !== "expand_y" &&
                                key !== "from"
                            ))
                        )
                    ) as CellData : col
                ))
            ))
        })
    }
    else {
        const expandX = selectedCells.end.x - selectedCells.start.x + 1
        const expandY = selectedCells.end.y - selectedCells.start.y + 1
        onChange({
            ...spreadsheetData,
            cells: spreadsheetData.cells.map((row, rowIndex) => row.map((col, colIndex) => (
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
                ...(expandX > 1 ? {
                    expand_x: expandX
                } : {}),
                ...(expandY > 1 ? {
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
        })
        setDraggingStartCell({
            x: selectedCells.start.x,
            y: selectedCells.start.y,
        })
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
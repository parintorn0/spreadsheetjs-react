import type React from "react";

export interface Coordinate {
    x: number,
    y: number,
}

interface Color {
    r: number,
    g: number,
    b: number,
    a: number,
}

interface BorderStyle {
    width: number,
    style: string,
    color: Color,
}

export interface Border {
    top?: BorderStyle,
    right?: BorderStyle,
    bottom?: BorderStyle,
    left?: BorderStyle,
}

export interface Style {
    font_size?: number,
    text_bold?: boolean,
    text_align?: string,
    text_vertical_align?: string,
    background_color?: Color,
    font_color?: Color,
    border?: Border,
}

export interface Image {
    id?: string,
    path: string,
    blob: Blob,
}

export interface CellData {
    value: string | React.ReactNode,
    image?: Image,
    hover_value?: string | React.ReactNode,
    selection_description?: string | React.ReactNode,
    from?: Coordinate,
    expand_x?: number,
    expand_y?: number,
    style?: Style,
}

export interface SpreadsheetData {
    cells: Array<Array<CellData>>,
    cols_width: Array<number>,
    rows_height: Array<number>,
}

export interface AppendCellMenu {
    label: string,
    onClick: (spreadsheetData: SpreadsheetData, startDraggingCell: Coordinate, selectedCells: SelectedCells) => Promise<number | null>
}

export interface SpreadsheetProps {
    cells: Array<Array<CellData>>,
    rows_height: Array<number>,
    cols_width: Array<number>,
    viewOnlyMode?: boolean,
    onChange: (spreadsheet: SpreadsheetData) => void,
    overrideResizeColumnPrompt?: () => Promise<number | null>,
    overrideResizeRowPrompt?: () => Promise<number | null>,
    appendCellMenus?: Array<AppendCellMenu>,
    preAddImage?: (blob: Blob) => Promise<Image | null>,
}

export interface SelectedCells {
    start: Coordinate,
    end: Coordinate,
}

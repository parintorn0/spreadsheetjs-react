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
    text_align?: "left" | "center" | "right",
    text_vertical_align?: "top" | "middle" | "bottom",
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
    onClick: (
        spreadsheetData: SpreadsheetData,
        draggingStartCell: Coordinate,
        selectedCells: SelectedCells
    ) => Promise<void>
}

interface AppendToolbarTool {
    children: React.ReactNode,
    description: string,
    onClick: (
        spreadsheetData: SpreadsheetData,
        draggingStartCell: Coordinate,
        selectedCells: SelectedCells,
    ) => Promise<void>,
}

export interface AppendToolbarSection {
    name: string,
    tools: Array<Array<AppendToolbarTool>>,
}

export interface SpreadsheetProps extends SpreadsheetData {
    viewOnlyMode?: boolean,
    onChange: (spreadsheet: SpreadsheetData) => void,
    overrideResizeColumnPrompt?: () => Promise<number | null>,
    overrideResizeRowPrompt?: () => Promise<number | null>,
    appendCellMenu?: Array<AppendCellMenu>,
    appendRowCellMenu?: Array<AppendCellMenu>,
    appendColumnCellMenu?: Array<AppendCellMenu>,
    appendToolbar?: Array<AppendToolbarSection>,
    preAddImage?: (blob: Blob) => Promise<Image | null>,
    disableDefaultToolbar?: boolean,
    disableDefaultCellMenu?: boolean,
    disableDefaultRowCellMenu?: boolean,
    disableDefaultColumnCellMenu?: boolean,
}

export interface SelectedCells {
    start: Coordinate,
    end: Coordinate,
}

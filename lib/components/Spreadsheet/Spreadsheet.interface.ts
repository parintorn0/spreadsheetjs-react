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

export interface CellData {
    value: string,
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

export interface SpreadsheetProps {
    cells: Array<Array<CellData>>,
    rows_height: Array<number>,
    cols_width: Array<number>,
    onChange: (spreadsheet: SpreadsheetData) => void,
    overrideResizeColumnPrompt?: () => Promise<number | null>,
    overrideResizeRowPrompt?: () => Promise<number | null>,
}

export interface SelectedCells {
    start: Coordinate,
    end: Coordinate,
}

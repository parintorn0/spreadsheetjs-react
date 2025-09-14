export interface Coordinate {
    x: number,
    y: number,
}

interface BorderStyle {
    width: number,
    style: string,
    color: {
        r: number,
        g: number,
        b: number,
        a: number,
    },
}

interface Style {
    text_bold?: boolean,
    text_align?: string,
    text_vertical_align?: string,
    background_color?: string,
    border?: {
        top?: BorderStyle,
        right?: BorderStyle,
        bottom?: BorderStyle,
        left?: BorderStyle,

    }
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
    spreadsheet?: SpreadsheetData,
    onChange?: (spreadsheet: SpreadsheetData) => void,
}

export interface SelectedCells {
    start: Coordinate,
    end: Coordinate,
}
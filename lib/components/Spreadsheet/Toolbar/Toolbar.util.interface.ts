import type {Coordinate, Image, SelectedCells, SpreadsheetData} from "../Spreadsheet.interface";

export interface SetStyleProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}

export interface SetTextAlignProps extends SetStyleProps {
    align: "left" | "center" | "right"
}

export interface SetTextVerticalAlignProps extends SetStyleProps {
    align: "top" | "middle" | "bottom"
}

export interface SetBackgroundColorProps extends SetStyleProps {
    color: {
        r: number,
        g: number,
        b: number,
        a: number,
    },
}

export interface SetFontColorProps extends SetStyleProps {
    color: {
        r: number,
        g: number,
        b: number,
        a: number,
    },
}

export interface SetBoldProps extends SetStyleProps {
    bold: boolean,
}

export interface SetFontSizeProps extends SetStyleProps {
    fontSize: number,
}

export interface SetBorderProps extends SetStyleProps {
    borderType: "top" | "right" | "bottom" | "left" | "all" | "inside" | "outside" | "none",
    borderWidth: number,
    borderStyle: "solid" | "dashed" | "dotted",
    borderColor: {
        r: number,
        g: number,
        b: number,
        a: number,
    }
}

export interface MergeCellsProps extends SetStyleProps {
    spreadsheetData: SpreadsheetData,
    setDraggingStartCell: React.Dispatch<React.SetStateAction<Coordinate>>,
    
}

export interface FontIncrementProps extends SetStyleProps {}
export interface FontDecrementProps extends SetStyleProps {}

interface ManageImageProps {
    spreadsheetData: SpreadsheetData,
    onChange: (spreadsheetData: SpreadsheetData) => void,
    selectedCells: SelectedCells,
}
export interface InsertImageProps extends ManageImageProps {
    preAddImage?: (blob: Blob) => Promise<Image | null>,
}

export interface DeleteImageProps extends ManageImageProps {}

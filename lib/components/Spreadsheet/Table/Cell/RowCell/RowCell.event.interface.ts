import type { Coordinate } from "../../../Spreadsheet.interface";
import type { DraggingPropsStructure, StartDraggingPropsStructure } from "../../Table.event.interface";

export interface RowStartDraggingProps extends StartDraggingPropsStructure {
    rowIndex: number,
}

export interface RowDraggingProps extends DraggingPropsStructure {
    rowIndex: number,
    draggingStartCell: Coordinate,
}
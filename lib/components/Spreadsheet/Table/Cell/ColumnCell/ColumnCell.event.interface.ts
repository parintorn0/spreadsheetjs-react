import type { Coordinate } from "../../../Spreadsheet.interface";
import type { DraggingPropsStructure, StartDraggingPropsStructure } from "../../Table.event.interface";
export interface ColumnStartDraggingProps extends StartDraggingPropsStructure {
    columnIndex: number,
}
export interface ColumnDraggingProps extends DraggingPropsStructure {
    columnIndex: number,
    draggingStartCell: Coordinate,
}
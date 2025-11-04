import Button from "../Button/Button"
import {deleteRow} from "../../Spreadsheet.event"
import {DeleteRow} from "../../../../assets/icons/Icon"
import type { DeleteRowButtonProps } from "./DeleteRowButton.interface"

const InsertRowBeforeButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
}: DeleteRowButtonProps) => {
    return (
        <Button
            onClick={() => deleteRow({
                spreadsheetData,
                onChange,
                selectedCells,
                setSelectedCells,
                setDraggingStartCell,
            })}
            description="Delete Row"
            disabled={selectedCells.end.y - selectedCells.start.y === spreadsheetData.rows_height.length - 1}
        >
            <DeleteRow />
        </Button>
    )
}

export default InsertRowBeforeButton

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
    canDeleteRow,
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
            disabled={!canDeleteRow}
        >
            <DeleteRow />
        </Button>
    )
}

export default InsertRowBeforeButton

import Button from "../Button/Button"
import {deleteColumn} from "../../Spreadsheet.event"
import {DeleteColumn} from "../../../../assets/icons/Icon"
import type { DeleteColumnButtonProps } from "./DeleteColumnButton.interface"

const DeleteColumnButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
    canDeleteColumn,
}: DeleteColumnButtonProps) => {
    return (
        <Button
            onClick={() => deleteColumn({
                spreadsheetData,
                onChange,
                selectedCells,
                setSelectedCells,
                setDraggingStartCell,
            })}
            description="Delete Column"
            disabled={!canDeleteColumn}
        >
            <DeleteColumn />
        </Button>
    )
}

export default DeleteColumnButton

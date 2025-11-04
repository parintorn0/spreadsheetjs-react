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
            disabled={selectedCells.end.x - selectedCells.start.x === spreadsheetData.cols_width.length - 1}
        >
            <DeleteColumn />
        </Button>
    )
}

export default DeleteColumnButton

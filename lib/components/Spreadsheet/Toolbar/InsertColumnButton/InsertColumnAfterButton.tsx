import Button from "../Button/Button"
import {insertColumn} from "../../Spreadsheet.event"
import {InsertColumnAfter} from "../../../../assets/icons/Icon"
import type { InsertColumnAfterButtonProps } from "./InsertCulumnButton.interface"

const DeleteRowButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
}: InsertColumnAfterButtonProps) => {
    return (
        <Button
            onClick={() => insertColumn({
                spreadsheetData,
                onChange,
                selectedCells,
                setSelectedCells,
                setDraggingStartCell,
                after: true,
            })}
            description="Insert Column After"
        >
            <InsertColumnAfter />
        </Button>
    )
}

export default DeleteRowButton

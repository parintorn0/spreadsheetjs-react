import Button from "../Button/Button"
import {insertRow} from "../../Spreadsheet.event"
import {InsertRowBefore} from "../../../../assets/icons/Icon"
import type { InsertRowBeforeButtonProps } from "./InsertRowButton.interface"

const InsertRowBeforeButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
    canInsertRowAbove,
}: InsertRowBeforeButtonProps) => {
    return (
        <Button
            onClick={() => insertRow({
                spreadsheetData,
                onChange,
                selectedCells,
                setSelectedCells,
                setDraggingStartCell,
                after: false,
            })}
            description="Insert Row Above"
            disabled={!canInsertRowAbove}
        >
            <InsertRowBefore />
        </Button>
    )
}

export default InsertRowBeforeButton

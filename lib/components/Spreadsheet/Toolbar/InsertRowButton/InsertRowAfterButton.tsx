import Button from "../Button/Button"
import {insertRow} from "../../Spreadsheet.event"
import {InsertRowAfter} from "../../../../assets/icons/Icon"
import type { InsertRowAfterButtonProps } from "./InsertRowButton.interface"

const InsertRowAfterButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
    canInsertRowBelow,
}: InsertRowAfterButtonProps) => {
    return (
        <Button
            onClick={() => insertRow({
                spreadsheetData,
                onChange,
                selectedCells,
                setSelectedCells,
                setDraggingStartCell,
                after: true,
            })}
            description="Insert Row Below"
            disabled={!canInsertRowBelow}
        >
            <InsertRowAfter />
        </Button>
    )
}

export default InsertRowAfterButton

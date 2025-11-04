import Button from "../Button/Button"
import {insertRow} from "../../Spreadsheet.event"
import {InsertRowAfter} from "../../../../assets/icons/Icon"
import type { InsertRowAfterButtonProps } from "./InsertRowButton.interface"

const InsertRowBeforeButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
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
        >
            <InsertRowAfter />
        </Button>
    )
}

export default InsertRowBeforeButton

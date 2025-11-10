import Button from "../Button/Button"
import {insertColumn} from "../../Spreadsheet.event"
import {InsertColumnAfter} from "../../../../assets/icons/Icon"
import type { InsertColumnAfterButtonProps } from "./InsertCulumnButton.interface"

const InsertColumnAfterButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
    canInsertRowAfter,
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
            disabled={!canInsertRowAfter}
        >
            <InsertColumnAfter />
        </Button>
    )
}

export default InsertColumnAfterButton

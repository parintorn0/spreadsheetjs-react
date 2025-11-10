import Button from "../Button/Button"
import {insertColumn} from "../../Spreadsheet.event"
import {InsertColumnBefore} from "../../../../assets/icons/Icon"
import type { InsertColumnBeforeButtonProps } from "./InsertCulumnButton.interface"

const InsertColumnBeforeButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
    canInsertRowBefore,
}: InsertColumnBeforeButtonProps) => {
    return (
        <Button
            onClick={() => insertColumn({
                spreadsheetData,
                onChange,
                selectedCells,
                setSelectedCells,
                setDraggingStartCell,
                after: false,
            })}
            description="Insert Column Before"
            disabled={!canInsertRowBefore}
        >
            <InsertColumnBefore />
        </Button>
    )
}

export default InsertColumnBeforeButton

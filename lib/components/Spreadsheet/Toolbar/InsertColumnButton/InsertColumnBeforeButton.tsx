import Button from "../Button/Button"
import {insertColumn} from "../../Spreadsheet.event"
import {InsertColumnBefore} from "../../../../assets/icons/Icon"
import type { InsertColumnBeforeButtonProps } from "./InsertCulumnButton.interface"

const InsertRowBeforeButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    setDraggingStartCell,
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
        >
            <InsertColumnBefore />
        </Button>
    )
}

export default InsertRowBeforeButton

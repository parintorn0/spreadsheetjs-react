import { Merge } from "../../../../assets/icons/Icon"
import { mergeCells } from "../Toolbar.util"
import Button from "../Button/Button"
import type { MergeCellsButtonProps } from "./MergeCellsButton.interface"

const MergeCellsButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setDraggingStartCell,
}: MergeCellsButtonProps) => {
    return (
        <Button
            onClick={() => mergeCells({
                spreadsheetData,
                onChange,
                selectedCells,
                setDraggingStartCell
            })}
            description="Merge selected cells"
        >
            <Merge />
        </Button>
    )
}

export default MergeCellsButton
import { rotateClockwise } from "../../Toolbar.util"
import { RotateClockwise } from "../../../../../assets/icons/Icon"
import Button from "../../Button/Button"
import type { RotateClockwiseButtonProps } from "./RotateClockwiseButton.interface"

const RotateClockwiseButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: RotateClockwiseButtonProps) => {
    return (
        <Button
            onClick={() => rotateClockwise({
                spreadsheetData,
                onChange,
                selectedCells,
            })}
            description="Merge selected cells"
        >
            <RotateClockwise />
        </Button>
    )
}

export default RotateClockwiseButton

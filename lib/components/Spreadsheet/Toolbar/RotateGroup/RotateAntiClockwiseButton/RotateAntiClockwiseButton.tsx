import { rotateAntiClockwise } from "../../Toolbar.util"
import { RotateAntiClockwise } from "../../../../../assets/icons/Icon"
import Button from "../../Button/Button"
import type { RotateAntiClockwiseButtonProps } from "./RotateAntiClockwiseButton.interface"

const RotateClockwiseButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: RotateAntiClockwiseButtonProps) => {
    return (
        <Button
            onClick={() => rotateAntiClockwise({
                spreadsheetData,
                onChange,
                selectedCells,
            })}
            description="Merge selected cells"
        >
            <RotateAntiClockwise />
        </Button>
    )
}

export default RotateClockwiseButton

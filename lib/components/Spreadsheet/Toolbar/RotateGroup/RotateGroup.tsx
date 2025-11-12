import Class from "./RotateGroup.module.css"
import type { RotateGroupProps } from "./RotateGroup.interface"
import RotateClockwiseButton from "./RotateClockwise/RotateClockwiseButton"
import RotateAntiClockwiseButton from "./RotateAntiClockwiseButton/RotateAntiClockwiseButton"

const RotateGroup = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: RotateGroupProps) => {

    return (
        <div className={Class.rotateGroup}>
            <RotateClockwiseButton
                spreadsheetData={spreadsheetData}
                onChange={onChange}
                selectedCells={selectedCells}
            />
            <RotateAntiClockwiseButton
                spreadsheetData={spreadsheetData}
                onChange={onChange}
                selectedCells={selectedCells}
            />
        </div>
    )
}

export default RotateGroup

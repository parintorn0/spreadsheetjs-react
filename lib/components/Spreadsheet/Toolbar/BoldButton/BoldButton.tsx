import { useEffect, useState } from "react"
import Button from "../Button/Button"
import type { BoldButtonProps } from "./BoldButton.interface"
import { setBold } from "../Toolbar.util"
import { FontBold } from "../../../../assets/icons/Icon"

const BoldButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    draggingStartCell,
}: BoldButtonProps) => {

    const [boldState, setBoldState] = useState(false)

    const clickHandler = () => {
        setBold({
            spreadsheetData,
            onChange,
            selectedCells,
            bold: !boldState,
        })
        setBoldState(!boldState)
    }

    useEffect(()=>{
        setBoldState(spreadsheetData.cells[draggingStartCell.y]?.[draggingStartCell.x]?.style?.text_bold ?? false)
    }, [draggingStartCell])

    return (
        <Button
            checked={boldState}
            onClick={clickHandler}
            description="Toggle bold"
        >
            <FontBold />
        </Button>
    )
}

export default BoldButton
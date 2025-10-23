import { InsertImage } from "../../../../assets/icons/Icon"
import { insertImage } from "../Toolbar.util"
import Button from "../Button/Button"
import type { InsertImageButtonProps } from "./InsertImageButton.interface"

const InsertImageButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
    preAddImage,
}: InsertImageButtonProps) => (
    <Button
        onClick={() => insertImage({
            spreadsheetData,
            onChange,
            selectedCells,
            preAddImage,
        })}
        description="Insert Image"
    >
        <InsertImage />
    </Button>
)

export default InsertImageButton
import { InsertImage } from "../../../../assets/icons/Icon"
import { insertImage } from "../Toolbar.util"
import Button from "../Button/Button"
import type { InsertImageButtonProps } from "./InsertImageButton.interface"

const InsertImageButton = ({
    spreadsheetData,
    onChange,
    draggingStartCell,
}: InsertImageButtonProps) => (
    <Button
        onClick={() => insertImage({
            spreadsheetData,
            onChange,
            draggingStartCell,
        })}
        description="Insert Image"
    >
        <InsertImage />
    </Button>
)

export default InsertImageButton
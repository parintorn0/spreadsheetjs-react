import { DeleteImage } from "../../../../assets/icons/Icon";
import Button from "../Button/Button";
import { deleteImage } from "../Toolbar.util";
import type { DeleteImageButtonProps } from "./DeleteImageButton.interface";

const DeleteImageButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: DeleteImageButtonProps) => (
    <Button
        onClick={() => deleteImage({
            spreadsheetData,
            onChange,
            selectedCells,
        })}
        description="Delete Image"
    >
        <DeleteImage />
    </Button>
)

export default DeleteImageButton
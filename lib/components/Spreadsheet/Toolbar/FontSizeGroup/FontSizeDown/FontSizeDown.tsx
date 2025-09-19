import { FontDecrement } from "../../../../../assets/icons/Icon";
import { fontDecrement } from "../../Toolbar.util";
import Button from "../../Button/Button";
import type { FontSizeDownProps } from "./FontSizeDown.interface";

const FontSizeDown = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: FontSizeDownProps) => {
    return (
        <Button
        onClick={() => {
            fontDecrement({
                spreadsheetData,
                onChange,
                selectedCells
            })
        }}
        description={"Decrease font size"}
        >
            <FontDecrement />
        </Button>
    )
}

export default FontSizeDown
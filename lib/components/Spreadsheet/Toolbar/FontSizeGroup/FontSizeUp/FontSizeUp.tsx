import { FontIncrement } from "../../../../../assets/icons/Icon";
import { fontIncrement } from "../../Toolbar.util";
import Button from "../../Button/Button";
import type { FontSizeUpProps } from "./FontSizeUp.interface";

const FontSizeUp = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: FontSizeUpProps) => {
    return (
        <Button
            onClick={() => {
                fontIncrement({
                    spreadsheetData,
                    onChange,
                    selectedCells
                })
            }}
            description={"Increase font size"}
        >
            <FontIncrement />
        </Button>
    )
}

export default FontSizeUp
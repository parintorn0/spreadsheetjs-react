import DropDownButton from "../DropdownButton/DropdownButton"
import Button from "../Button/Button"
import { useState } from "react"
import type { DropdownTextVerticalAlignButtonProps } from "./DropdownTextVerticalAlignButton.interface"
import { setTextVerticalAlign } from "../Toolbar.util"
import { TextVerticalAlignBottom, TextVerticalAlignMiddle, TextVerticalAlignTop } from "../../../../assets/icons/Icon"

const DropdownTextVerticalAlignButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: DropdownTextVerticalAlignButtonProps) => {
    const TextAlignButton = ({
        align,
        children,
    }: {
        align: "top" | "middle" | "bottom",
        children: React.ReactNode,
    }): React.ReactNode => (
        <Button
        onClick={() => {
            setCurrentTextVerticalAlignButton(children)
            setTextVerticalAlign({
                spreadsheetData,
                onChange,
                selectedCells,
                align,
            })}
        }
        description={`Align text to the ${align==="middle"?"vertically ":""}${align}`}
        >
            {children}
        </Button>
    )

    const TextVerticalAlignTopButton = () => (
        <TextAlignButton
            align="top"
        >
            <TextVerticalAlignTop />
        </TextAlignButton>
    )

    const TextVerticalAlignMiddleButton = () => (
        <TextAlignButton
            align="middle"
        >
            <TextVerticalAlignMiddle />
        </TextAlignButton>
    )

    const TextVerticalAlignBottomButton = () => (
        <TextAlignButton
            align="bottom"
        >
            <TextVerticalAlignBottom />
        </TextAlignButton>
    )

    const [currentTextVerticalAlignButton, setCurrentTextVerticalAlignButton] = useState<React.ReactNode>(<TextVerticalAlignMiddle />)

    return (
        <DropDownButton
        button={(
            <Button>
                {currentTextVerticalAlignButton}
            </Button>
        )}
        >
            <TextVerticalAlignTopButton />
            <TextVerticalAlignMiddleButton />
            <TextVerticalAlignBottomButton />
        </DropDownButton>
    )
}

export default DropdownTextVerticalAlignButton
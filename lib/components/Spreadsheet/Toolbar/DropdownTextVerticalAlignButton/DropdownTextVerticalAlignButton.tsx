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
            setCurrentTextVerticalAlignButton({
                align,
                node: children
            })
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

    const [currentTextVerticalAlignButton, setCurrentTextVerticalAlignButton] = useState<{
        node: React.ReactNode,
        align: "top" | "middle" | "bottom",
    }>({
        node: <TextVerticalAlignMiddle />,
        align: "middle"
    })

    return (
        <DropDownButton
        button={(
            <Button
            onClick={() => setTextVerticalAlign({
                spreadsheetData,
                onChange,
                selectedCells,
                align: currentTextVerticalAlignButton.align,
            })}
            >
                {currentTextVerticalAlignButton.node}
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
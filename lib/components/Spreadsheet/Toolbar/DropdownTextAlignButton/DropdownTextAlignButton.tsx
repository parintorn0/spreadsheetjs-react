import DropDownButton from "../DropdownButton/DropdownButton"
import Button from "../Button/Button"
import { useState } from "react"
import type { DropdownTextAlignButtonProps } from "./DropdownTextAlignButton.interface"
import { setTextAlign } from "../Toolbar.util"
import { TextAlignLeft, TextAlignCenter, TextAlignRight } from "../../../../assets/icons/Icon"

const DropdownTextAlignButton = ({
    spreadsheetData,
    onChange,
    selectedCells,
}: DropdownTextAlignButtonProps) => {
    const TextAlignButton = ({
        align,
        children,
    }: {
        align: "left" | "center" | "right",
        children: React.ReactNode,
    }): React.ReactNode => (
        <Button
        onClick={() => {
            setCurrentTextAlignButton(children)
            setTextAlign({
                spreadsheetData,
                onChange,
                selectedCells,
                align,
            })}
        }
        description={`Align text to the ${align==="center"?"horizontally ":""}${align}`}
        >
            {children}
        </Button>
    )

    const TextAlignLeftButton = () => (
        <TextAlignButton
            align="left"
        >
            <TextAlignLeft />
        </TextAlignButton>
    )

    const TextAlignCenterButton = () => (
        <TextAlignButton
            align="center"
        >
            <TextAlignCenter />
        </TextAlignButton>
    )

    const TextAlignRightButton = () => (
        <TextAlignButton
            align="right"
        >
            <TextAlignRight />
        </TextAlignButton>
    )

    const [currentTextAlignButton, setCurrentTextAlignButton] = useState<React.ReactNode>(<TextAlignLeft />)

    return (
        <DropDownButton
        button={(
            <Button>
                {currentTextAlignButton}
            </Button>
        )}
        >
            <TextAlignLeftButton />
            <TextAlignCenterButton />
            <TextAlignRightButton />
        </DropDownButton>
    )
}

export default DropdownTextAlignButton
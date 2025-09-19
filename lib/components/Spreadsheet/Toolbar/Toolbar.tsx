import Class from "./Toolbar.module.css"

import type { ToolbarProps } from "./Toolbar.interface"
import DropdownTextAlignButton from "./DropdownTextAlignButton/DropdownTextAlignButton"
import DropdownTextVerticalAlignButton from "./DropdownTextVerticalAlignButton/DropdownTextVerticalAlignButton"
import DropdownBackgroundColorButton from "./DropdownBackgroundColorButton/DropdownBackgroundColorButton"
import DropdownFontColorButton from "./DropdownFontColorButton/DropdownFontColorButton"
import BoldButton from "./BoldButton/BoldButton"
import DropdownBorderButton from "./DropdownBorderButton/DropdownBorderButton"
import MergeCellsButton from "./MergeCellsButton/MergeCellsButton"
import FontSizeGroup from "./FontSizeGroup/FontSizeGroup"

const Toolbar = ({
    spreadsheetData,
    onChange,
    selectedCells,
    draggingStartCell,
    setDraggingStartCell,
}: ToolbarProps) => {

    return (
        <div className={Class.toolbar}>
            <div className="section">
                <div className="section-name">
                    Cell Customization
                </div>
                <div className="section-tools">
                    <DropdownTextAlignButton
                        spreadsheetData={spreadsheetData}
                        onChange={onChange}
                        selectedCells={selectedCells}
                    />

                    <DropdownTextVerticalAlignButton
                        spreadsheetData={spreadsheetData}
                        onChange={onChange}
                        selectedCells={selectedCells}
                    />
                    <DropdownBackgroundColorButton
                        spreadsheetData={spreadsheetData}
                        onChange={onChange}
                        selectedCells={selectedCells}
                    />

                    <DropdownBorderButton
                        spreadsheetData={spreadsheetData}
                        onChange={onChange}
                        selectedCells={selectedCells}
                    />
                </div>
                <div className="section-tools">
                    <DropdownFontColorButton
                        spreadsheetData={spreadsheetData}
                        onChange={onChange}
                        selectedCells={selectedCells}
                    />
                    <BoldButton
                        spreadsheetData={spreadsheetData}
                        onChange={onChange}
                        selectedCells={selectedCells}
                        draggingStartCell={draggingStartCell}
                    />
                    <FontSizeGroup
                        spreadsheetData={spreadsheetData}
                        onChange={onChange}
                        selectedCells={selectedCells}
                        draggingStartCell={draggingStartCell}
                    />
                </div>
            </div>

            <div className="section">
                <div className="section-name">
                    Cell Manipulation
                </div>
                <div className="section-tools">
                    <div/>
                    <MergeCellsButton
                        spreadsheetData={spreadsheetData}
                        onChange={onChange}
                        selectedCells={selectedCells}
                        setDraggingStartCell={setDraggingStartCell}
                    />
                    <div/>
                </div>
                <div/>
            </div>
        </div>
    )
}

export default Toolbar
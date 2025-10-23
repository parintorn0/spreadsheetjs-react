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
import InsertImageButton from "./InsertImageButton/InsertImageButton"
import DeleteImageButton from "./DeleteImageButton/DeleteImageButton"

const Toolbar = ({
    spreadsheetData,
    onChange,
    selectedCells,
    draggingStartCell,
    setDraggingStartCell,
    preAddImage,
}: ToolbarProps) => {

    return (
        <div className={Class.toolbar}>
            <div className={Class.section}>
                <div className={Class.sectionName}>
                    Cell Customization
                </div>
                <div className={Class.sectionTools}>
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
                <div className={Class.sectionTools}>
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

            <div className={Class.section}>
                <div className={Class.sectionName}>
                    Cell Manipulation
                </div>
                <div className={Class.sectionTools}>
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

            <div className={Class.section}>
                <div className={Class.sectionName}>
                    Image
                </div>
                <div className={Class.sectionTools}>
                    <InsertImageButton
                        spreadsheetData={spreadsheetData}
                        onChange={onChange}
                        selectedCells={selectedCells}
                        preAddImage={preAddImage}
                    />
                    <DeleteImageButton
                        spreadsheetData={spreadsheetData}
                        onChange={onChange}
                        selectedCells={selectedCells}
                    />
                </div>
                <div/>
            </div>
        </div>
    )
}

export default Toolbar
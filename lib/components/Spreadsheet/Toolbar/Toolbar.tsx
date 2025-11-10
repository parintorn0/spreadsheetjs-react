import Class from "./Toolbar.module.css"

import type { ToolbarProps } from "./Toolbar.interface"
import DropdownTextAlignButton from "./DropdownTextAlignButton/DropdownTextAlignButton"
import DropdownTextVerticalAlignButton from "./DropdownTextVerticalAlignButton/DropdownTextVerticalAlignButton"
import DropdownBackgroundColorButton from "./DropdownBackgroundColorButton/DropdownBackgroundColorButton"
import DropdownFontColorButton from "./DropdownFontColorButton/DropdownFontColorButton"
import BoldButton from "./BoldButton/BoldButton"
import DropdownBorderButton from "./DropdownBorderButton/DropdownBorderButton"
import MergeCellsButton from "./MergeCellsButton/MergeCellsButton"
import InsertRowBeforeButton from "./InsertRowButton/InsertRowBeforeButton"
import InsertRowAfterButton from "./InsertRowButton/InsertRowAfterButton"
import DeleteRowButton from "./DeleteRowButton/DeleteRowButton"
import InsertColumnBeforeButton from "./InsertColumnButton/InsertColumnBeforeButton"
import InsertColumnAfterButton from "./InsertColumnButton/InsertColumnAfterButton"
import DeleteColumnButton from "./DeleteColumnButton/DeleteColumnButton"
import FontSizeGroup from "./FontSizeGroup/FontSizeGroup"
import InsertImageButton from "./InsertImageButton/InsertImageButton"
import DeleteImageButton from "./DeleteImageButton/DeleteImageButton"
import Button from "./Button/Button"

const Toolbar = ({
    spreadsheetData,
    onChange,
    selectedCells,
    setSelectedCells,
    draggingStartCell,
    setDraggingStartCell,
    canInsertRowAbove,
    canInsertRowBelow,
    canDeleteRow,
    canInsertColumnBefore,
    canInsertColumnAfter,
    canDeleteColumn,
    preAddImage,
    appendToolbar,
    disableDefaultToolbar=false,
}: ToolbarProps) => {

    return (
        <div className={Class.toolbar}>
            {!disableDefaultToolbar && (
                <>
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
                            <InsertRowBeforeButton
                                spreadsheetData={spreadsheetData}
                                onChange={onChange}
                                selectedCells={selectedCells}
                                setSelectedCells={setSelectedCells}
                                setDraggingStartCell={setDraggingStartCell}
                                canInsertRowAbove={canInsertRowAbove}
                            />
                            <InsertRowAfterButton
                                spreadsheetData={spreadsheetData}
                                onChange={onChange}
                                selectedCells={selectedCells}
                                setSelectedCells={setSelectedCells}
                                setDraggingStartCell={setDraggingStartCell}
                                canInsertRowBelow={canInsertRowBelow}
                            />
                            <DeleteRowButton
                                spreadsheetData={spreadsheetData}
                                onChange={onChange}
                                selectedCells={selectedCells}
                                setSelectedCells={setSelectedCells}
                                setDraggingStartCell={setDraggingStartCell}
                                canDeleteRow={canDeleteRow}
                            />
                            <div/>
                        </div>
                        <div className={Class.sectionTools}>
                            <div/>
                            <InsertColumnBeforeButton
                                spreadsheetData={spreadsheetData}
                                onChange={onChange}
                                selectedCells={selectedCells}
                                setSelectedCells={setSelectedCells}
                                setDraggingStartCell={setDraggingStartCell}
                                canInsertRowBefore={canInsertColumnBefore}
                            />
                            <InsertColumnAfterButton
                                spreadsheetData={spreadsheetData}
                                onChange={onChange}
                                selectedCells={selectedCells}
                                setSelectedCells={setSelectedCells}
                                setDraggingStartCell={setDraggingStartCell}
                                canInsertRowAfter={canInsertColumnAfter}
                            />
                            <DeleteColumnButton
                                spreadsheetData={spreadsheetData}
                                onChange={onChange}
                                selectedCells={selectedCells}
                                setSelectedCells={setSelectedCells}
                                setDraggingStartCell={setDraggingStartCell}
                                canDeleteColumn={canDeleteColumn}
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
                </>
            )}
            {appendToolbar && appendToolbar.map(({name, tools}, toolbarIndex) => (
                <div
                    key={toolbarIndex}
                    className={Class.section}
                >
                    <div className={Class.sectionName}>
                        {name}
                    </div>
                    {tools.map((row, rowIndex) => (
                        <div
                            key={rowIndex}
                            className={Class.sectionTools}
                        >
                            <div/>
                            {row.map(({description, onClick, children}, index) => (
                                <Button
                                    key={index}
                                    onClick={async () => await onClick(spreadsheetData, draggingStartCell, selectedCells)}
                                    description={description}
                                >
                                    {children}
                                </Button>
                            ))}
                            <div/>
                        </div>
                    ))}
                    <div/>
                </div>
            ))}
        </div>
    )
}

export default Toolbar

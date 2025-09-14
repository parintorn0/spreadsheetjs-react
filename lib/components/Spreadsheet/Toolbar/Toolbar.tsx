import Class from "./Toolbar.module.css"

import type { ToolbarProps } from "./Toolbar.interface"
import { mergeCells } from "./Toolbar.util"

const Toolbar = ({
    spreadsheetData,
    setSpreadsheetData,
    selectedCells,

}: ToolbarProps) => {
    return (
        <div className={Class.toolbar}>
            <div>
                <button
                onClick={()=>mergeCells({spreadsheetData, selectedCells, setSpreadsheetData})}
                >
                    merge
                </button>
            </div>
        </div>
    )
}

export default Toolbar
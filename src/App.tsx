import Class from "./App.module.css"
import Spreadsheet from "../lib/components/Spreadsheet/Spreadsheet"
import { useState } from "react"
import type { CellData, CellRange } from "../lib/components/Spreadsheet/Spreadsheet.interface"

function App() {

  const [cells, setCells] = useState<CellData[][]>([[{
    value: <div>test</div>
  }, {
    value: "B1"
  }], [{
    value: "A2"
  }, {
    value: "B2"
  }]])
  const [rowsHeight, setRowsHeight] = useState([50, 50])
  const [colsWidth, setColsWidth] = useState([100, 100])
  const [mergedCells, setMergeCells] = useState<Array<CellRange>>([])

  return (
    <div className={Class.app}>
      <Spreadsheet
        cells={cells}
        rows_height={rowsHeight}
        // viewOnlyMode={true}
        cols_width={colsWidth}
        merged_cells={mergedCells}
        onChange={({ cells, rows_height, cols_width, merged_cells }) => {
          setCells(cells)
          setRowsHeight(rows_height)
          setColsWidth(cols_width)
          setMergeCells(merged_cells)
        }}
      />
    </div>
  )
}

export default App

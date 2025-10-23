import Class from "./App.module.css"
import Spreadsheet from "../lib/components/Spreadsheet/Spreadsheet"
import { useState } from "react"
import type { CellData } from "../lib/components/Spreadsheet/Spreadsheet.interface"

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

  return (
    <div className={Class.app}>
      <Spreadsheet
        cells={cells}
        rows_height={rowsHeight}
        // viewOnlyMode={true}
        cols_width={colsWidth}
        onChange={({ cells, rows_height, cols_width }) => {
          setCells(cells)
          setRowsHeight(rows_height)
          setColsWidth(cols_width)
        }}
      />
    </div>
  )
}

export default App

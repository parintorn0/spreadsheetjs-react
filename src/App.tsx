import Class from "./App.module.css"
import Spreadsheet from "../lib/components/Spreadsheet/Spreadsheet"
import { useState } from "react"

function App() {

  const [cells, setCells] = useState([[{ value: "A1" }]])
  const [rowsHeight, setRowsHeight] = useState([50])
  const [colsWidth, setColsWidth] = useState([100])

  return (
    <div className={Class.app}>
      <Spreadsheet
        cells={cells}
        rows_height={rowsHeight}
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

# SpreadsheetJS React Component

<b>SpreadsheetJS React</b> is one of the library of React Component with ease to use in any React project and will not break a project

<!-- 
## Installation
`npm install --save @parintorn0/spreadsheetjs-react` -->

# Documentation

## Basic Usage


#### without passing any properties, it will generate sample spreadsheet
```
import { Spreadsheet } from "spreadsheetjs-react"

const YourParentComponent = () => {
  return (
    <Spreadsheet />
  )
}
export default YourParentComponent
```

#### To pass `spreadsheet` properties, it must be passed all the required properties including
#### `cells`: data in each cell,
#### `rows_height`: height of each row,
#### `cols_width`: width of each column

#### Example of empty 2x2 spreadsheet
```
import { Spreadsheet } from "spreadsheetjs-react"

const YourParentComponent = () => {
  return (
    <Spreadsheet spreadsheet={
        cells: [
            [
                {
                    value: "",
                },
                {
                    value: "",
                },
            ], [
                {
                    value: "",
                },
                {
                    value: "",
                },
            ],
        ],
        rows_height: [50, 50],
        cols_width: [100, 100],
    } />
  )
}
```
# Props

## cells: `Array[][]`

`cell`.`value`: `String` value of this cell

`cell`.`from`: `Object(x, y) | null` where merge start

`cell`.`expand_x`: `Number | null` how many cells from this cell to the right cells has merged

`cell`.`expand_y`: `Number | null` how many cells from this cell to the bottom cells has merged

`cell`.`style`: style of this cell



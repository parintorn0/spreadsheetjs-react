# SpreadsheetJS React Component

<b>SpreadsheetJS React</b> is one of the library of React Component with ease to use in any React project and will not break a project

<!--
## Installation
`npm install --save @parintorn0/spreadsheetjs-react` -->

# Documentation

## Basic Usage


### without passing any properties, it will generate sample spreadsheet
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
`cells`: data in each cell,

`rows_height`: height of each row,

`cols_width`: width of each column

`merged_cells`: all merged cells

### Example of empty 2x2 spreadsheet
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
        merged_cells: []
    } />
  )
}
```
## Props

### cells: `Array[][]`

`cell`.`value`: `String` value of this cell

`cell`.`style`: style of this cell

# License

Licensed under the terms of the [MIT License](/LICENSE).

# Roadmap

## v1.x Features
### v1.0.x

<div
style="display:flex;align-items:center;gap:4px;"
>
  <img height=18 src=".assets/checklist-svgrepo-com.svg">
  Merge Cells
</div>
<div
style="display:flex;align-items:center;gap:4px;"
>
  <img height=18 src=".assets/checklist-svgrepo-com.svg">
  Style
</div>
<div
style="display:flex;align-items:center;gap:4px;"
>
  <img height=18 src=".assets/checklist-svgrepo-com.svg">
  Resize
</div>
<div
style="display:flex;align-items:center;gap:4px;"
>
  <img height=18 src=".assets/unchecked-svgrepo-com.svg">
  Delete Row & Column
</div>
<div
style="display:flex;align-items:center;gap:4px;"
>
  <img height=18 src=".assets/unchecked-svgrepo-com.svg">
  Insert Row & Column
</div>

## v2.x Features
Due to my bad design reason cause delete and insert features hassles, v1 will be deprecated but it still usable except those features

### v2.0.x

<div
style="display:flex;align-items:center;gap:4px;"
>
  <img height=18 src=".assets/checklist-svgrepo-com.svg">
  Merge Cells
</div>
<div
style="display:flex;align-items:center;gap:4px;"
>
  <img height=18 src=".assets/checklist-svgrepo-com.svg">
  Style
</div>
<div
style="display:flex;align-items:center;gap:4px;"
>
  <img height=18 src=".assets/checklist-svgrepo-com.svg">
  Resize
</div>
<div
style="display:flex;align-items:center;gap:4px;"
>
  <img height=18 src=".assets/checklist-svgrepo-com.svg">
  Delete Row & Column
</div>
<div
style="display:flex;align-items:center;gap:4px;"
>
  <img height=18 src=".assets/checklist-svgrepo-com.svg">
  Insert Row & Column
</div>

## v3.x Features
Entirely depend on <a href="https://github.com/parintorn0/speedysheet"><b>speedysheet</b></a> to port to other web framework

### v3.0.x

<div
style="display:flex;align-items:center;gap:4px;"
>
  <img height=18 src=".assets/unchecked-svgrepo-com.svg">
  Speedysheet Integration
</div>
<!--<div
style="display:flex;align-items:center;gap:4px;"
>-->
  <!--<img height=18 src=".assets/unchecked-svgrepo-com.svg">
  API Documentation-->
<!--</div>-->

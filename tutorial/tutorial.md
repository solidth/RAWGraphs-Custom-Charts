# Tutorial: How to create custome RAWGraph Chart.
Here is a small Tutorial on how to create your own RAWGraphs Chart you first need to clone our repository
## Setup
```
git clone git@gitlab.tugraz.at:95FD77DBCF078A32/rawgraphs-custom-charts.git
```
or the official template from RAWGraphs (https://github.com/rawgraphs/custom-rawcharts-template)
```
git clone git@github.com:rawgraphs/custom-rawcharts-template.git
```
Open the folder containing the repository:
```
cd <name-of-the-repo>
```
Install client-side dependencies:
```
npm install
```
You can now run the sandbox environment to test your charts:
```
npm run sandbox
```
After running the sandbox, you can look at the Live-Preview in your Browser under:
```
localhost:9000
```
## Create your Chart
Navigate to the `\src` folder.

```
cd \src
```
here you create a folder with the name of your chart
```
mkdir <your-chart-name>
```
after creating the folder you need to modify the `index.js` in the `\src` folder.
The `index.js` will typically look something like in the example below, here you just need to add your chart.

```
// index.js
export { default as similaritymap } from './similaritymap'
export { default as connectedscatterplot } from './connectedscatterplot'
export { default as polarareadiagram } from './polarareadiagram'

// add your chart
export { default as <your-chart-name> } from './<your-chart-name>'
```
Now you can start adding the neccessary files to your `/<your-chart-name>` folder.
For better readability we will use `chart` instead of `<your-chart-name>` for the example.
```
chart/
├── chart_thumb.svg
├── chart.js
├── chart.svg
├── dimensions.js
├── index.js
├── mapping.js
├── metadata.js
├── render.js
└── visualOptions.js
```
The added files:
- `chart_thumb.svg` is the SVG file for displaying the thumbnail of the chart on [RAWGraphs](https://app.rawgraphs.io/).
- `chart.js` serves as the main module that ties together all the components of your custom chart.
- `chart.svg` is the SVG displayed when selecting your custom chart on [RAWGraphs](https://app.rawgraphs.io/).
- `dimensions.js` defines the dimensions and configuration of the data dimensions used in the chart. 
- `index.js` acts as an entry point for your custom chart. It exports the main module of your chart, making it available for [RAWGraphs](https://app.rawgraphs.io/) to use.
- `mapping.js` defines the data mapping rules for your chart. It specifies how the data from the RAWGraphs interface should be mapped to the chart's dimensions and elements, transforming the input data into a format suitable for rendering.
- `metadata.js` This file contains metadata about your custom chart, such as its name, description, author, and other relevant information. It also includes details about the data dimensions and mapping options supported by the chart.
- `render.js` is responsible for the actual rendering of the chart. 
- `visualOptions.js` defines the visual options and customization settings for your chart. It specifies the various visual parameters (such as colors, sizes, and styles) that users can adjust to customize the appearance of the chart.

In the section below [File Examples](#file-examples) you can find code samples on how the basic structure of the files should look like.


After all of that your folder structure should look something like this
```
project-root/
├── README.md
├── src/
│   ├── <your-chart-name>
│   |   ├── <your-chart-name>_thumb.svg
│   |   ├── <your-chart-name>.js 
│   |   ├── ...
│   |   └── visualOptions.js
│   ├── other-chart
│   ├── ...
│   └── index.js
```
## Hint
If you want a more detailed look into the files, clone the  the [rawgraphs-charts repository](https://github.com/rawgraphs/rawgraphs-charts) and look at their example charts and all of their files under `\src`.
```
git clone git@github.com:rawgraphs/rawgraphs-charts.git
```
## File Examples
Remember for better readability we use `chart` instead of `<your-chart-name>`.

Keep in mind, that you need to replace `chart` with `<your-chart-name>` for your own custom chart.



### chart.js
```
import { metadata } from './metadata'
import { dimensions } from './dimensions'
import { mapData } from './mapping'
import { render } from './render'
import { visualOptions } from './visualOptions'
import styles from '../styles/base.raw.css'

export default {
  metadata,
  dimensions,
  mapData,
  render,
  visualOptions,
  styles,
}
```
### dimensions.js
```
export const dimensions = [
  {
    id: 'x',
    name: 'Left Side',
    validTypes: ['number'],
    required: true,
  },
  {
    id: 'y',
    name: 'Y axis',
    validTypes: ['number', 'string', 'date'],
    required: true,
  }
]
```
### index.js
```
export { default } from './chart'
```
### mapping.js
```
export const mapData = {
  x: 'get',
  y: 'get'
}
```
### metadata.js
```
import icon from './chart.svg'
import thumbnail from './chart_thumb.svg'

export const metadata = {
  name: 'Your Custom Chart',
  id: 'rawgraphs.chart',
  thumbnail,
  icon,
  categories: ['Correlations', 'Comparison', ...],
  description:
    'this is a description',
  code: '...',
  tutorial: '...',
}
```
### render.js
```
import * as d3 from 'd3'
import { legend, labelsOcclusion } from '@rawgraphs/rawgraphs-core'
import '../d3-styles.js'

export function render(
  svgNode,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
    // JavaScript Code for Visualisation
}
```
### visualOptions.js
```
export const visualOptions = {
    marginTop: {
    type: 'number',
    label: 'Margin (top)',
    default: 10,
    group: 'artboard',
  },

  marginRight: {
    type: 'number',
    label: 'Margin (right)',
    default: 10,
    group: 'artboard',
  },

  marginBottom: {
    type: 'number',
    label: 'Margin (bottom)',
    default: 10,
    group: 'artboard',
  },

  marginLeft: {
    type: 'number',
    label: 'Margin (left)',
    default: 10,
    group: 'artboard',
  },

  showLegend: {
    type: 'boolean',
    label: 'Show legend',
    default: false,
    group: 'artboard',
  },

  // and many more ...
}
```
## Test your Chart

After creating your own custom chart can test it in two different ways:
- testing locally with Sandbox.
- creating a build and test it on [RAWGraphs](https://app.rawgraphs.io/).
---
### Build and test it on [RAWGraphs](https://app.rawgraphs.io/)
When you are satisfied with your project, you can build the js bundle to be used in the RAWGraphs interface.

In terminal navigate the folder in wich you cloned this template and run:
```
npm run build
```
This will generate a folder named lib in which you will find three files.

The one named `index.umd.js` is the bundle that can be loaded by RAWGraphs as described in the section [Creating a Build](rawgraphs-custom-charts\README.md#Creating-a-Build).

---
### Test with Sandbox
To test your chart with your local [Sanbox](http://localhost:9000) you need to follow the following steps.

First you need to find a `Dataset` that works for your custom chart.

After acquiring your `Dataset` you need to go to the folder `\example` and create your testing-file.
For consistency and readability reasons we use `chart` again instead of `<your-chart-name>`.

Add the file `chart-test.js` to the folder `\example\configurations`.

Now the structure of `\example` shold look something like this:
```
project-root/
├── ...
├── example/
│   ├── components
│   ├── configurations
│   |   ├── ...
│   |   └── chart-test.js
│   ├── datasets
│   |   ├── ...
│   |   └── <your-dataset>.csv 
│   ├── App.js
│   ├── index.css
│   ├── index.html
│   └── index.js
```

Now lets add the basic structure of your testing-file
#### chart-test.js
```
// import your dataset
import data from '../datasets/<your-dataset>.csv'

// import custom chart you created
import chart from 'customcharts/chart'


// this is just some example of a barchart, modify it as you see fit for your custom chart.

export default {
  chart,
  data,
  dataTypes: {
    Year: {
      type: 'date',
      dateFormat: 'YYYY',
    },
    Age: 'string',
    Male: 'number',
  },
  mapping: {
    x: { value: ['Male'] },,
    y: { value: ['Age'] },
  },
  visualOptions: {
    width: 800,
    height: 600,
    padding: 0,
    labelLeftRotation: 45,
    labelLeftAlignment: 'start',
    background: 'white',
    title: 'My title',
  },
}
```

After creating your testing-file you can run the following command in the `root` of your repository/project.
```
npm run sandbox
```
after the sandbox was started correctly you can look at the live preview of your testing-file in the browser of your choice under:
```
http://localhost:9000
```


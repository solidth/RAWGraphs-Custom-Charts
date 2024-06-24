# Paired barchart for RAWGraphs

This custom chart is intedend to be used in https://app.rawgraphs.io/.

## What are Paired Barcharts

![](https://raw.githubusercontent.com/rawgraphs/rawgraphs-paired-barchart/master/src/barchartpaired/barchartpaired_thumb.svg)

This chart is designed for comparing two numerical dimensions across a set of ordered categories.

The most common application is for creating "[population pyramids](https://en.wikipedia.org/wiki/Population_pyramid)". In a population pyramid, one gender is represented on each side of the chart, with age groups arranged vertically. This allows you to observe the overall distribution of age groups and compare the distributions between males and females.

## Installation

- Download the latest release from the side panel on this page, or via [this link](https://github.com/rawgraphs/rawgraphs-paired-barchart/releases/latest/pairedbarchart.umd.js).
- In [RAWgraphs interface](https://app.rawgraphs.io/), load a dataset. You can use [this sample](https://raw.githubusercontent.com/rawgraphs/rawgraphs-paired-barchart/master/example/datasets/population_2019.csv).
- In the section `"2. Choose a chart"` scroll down and click on the button `"Load your chart"`
- Select the `"Load from file"` tab
- Drag and drop the downloaded file
- Click on `"Load your chart"` button
- A pop-up will inform you that you are loading an external piece of code, click on `"continue"` to load it
- You are now ready to use the chart

## Tutorial

In this tutorial we'll create population pyramid for Germany in 2019.

#### Dataset

Load the dataset you can find at [this link](https://raw.githubusercontent.com/rawgraphs/rawgraphs-paired-barchart/master/example/datasets/population_2019.csv). The dataset contains three columns: the age group, number of male people, and number of female people for that age group.

#### Chart Selection

select "Paired Barchart". If you don't see it, read the section [Installation](#Installation).

#### Mapping

Drag and drop the dimensions to the chart variables as it follows:

* `Male` on `Left side`
* `Female` on `Right side`
* `Age` on `Y Axis`

#### Customize

The chart offers some options to customize the chart.

In the **Axis** panel you'll find all the variables for handling the bottom axes ticks and their appearance.

* In `Vertical label override` put as text "Age group"

In the **Chart** you can define bars paddings, the internal space, and bars sorting

* Set `Space for common axis` to 80

In the **Color** panel you can associate one main tint that is then used to color the bars according to their value

* Set the first `Color scheme` to "Red sequential"
* Set the second `Color scheme` to "Green sequential"



## Contribute

If you'd like to contribute, follow the RAWGraphs [custom template guide](https://github.com/rawgraphs/custom-rawcharts-template).

## Credits

Original code by [@blindguardian50](https://github.com/blindguardian50) [@steve1711](https://github.com/steve1711), [@TheAlmightySpaceWarrior](https://github.com/TheAlmightySpaceWarrior), [@wizardry8](https://github.com/wizardry8) under the supervision of [@kandrews99](https://github.com/kandrews99)


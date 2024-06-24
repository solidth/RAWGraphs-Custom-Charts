import data from '../datasets/GermanyPopulationGrowth.csv'
import chart from 'customcharts/connectedscatterplot'

export default {
    chart,
    data,
    dataTypes: {
      year: 'number',
      Total_population: 'number',
      Net_migration_rate: 'number',
    },
    mapping: {
      x: { value: ['Total_population'] },
      y: { value: ['Net_migration_rate'] },
      connectedBy: { value: ['year'] },
      label: { value: ['year'] }
      // series: { value: ['side'] },
    },
    visualOptions: {
      width: 1000,
      height: 800,
      title: 'Connected Scatterplot - Germany`s population growth has been driven by immigration',
      xOrigin: false,
      yOrigin: false,
      showLegend: true,
      showPoints: true,
      dotsDiameter: 5,
      showStroke: true,
      marginTop: 20,
      marginRight: 20,
      marginBottom: 30,
      marginLeft: 40,
      background: 'white',
      showLabelsOutline: true,
      autoHideLabels: true,
      drawArrows: true,
    },
  }
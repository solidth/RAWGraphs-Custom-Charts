import data from '../datasets/driving.csv'
import chart from 'customcharts/connectedscatterplot'

export default {
    chart,
    data,
    dataTypes: {
      side: 'string',
      year: 'number',
      miles: 'number',
      gas: 'number',
    },
    mapping: {
      x: { value: ['miles'] },
      y: { value: ['gas'] },
      connectedBy: { value: ['year'] },
      label: { value: ['year'] }
      // series: { value: ['side'] },
    },
    visualOptions: {
      width: 1000,
      height: 800,
      title: 'Connected Scatterplot - Driving & Gas Prices',
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
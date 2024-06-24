import data from '../datasets/population_2019.csv'
import chart from 'customcharts/barchartpaired'

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
    Female: 'number',
  },
  mapping: {
    x1: { value: ['Male'] },
    x2: { value: ['Female'] },
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

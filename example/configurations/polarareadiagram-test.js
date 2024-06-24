import data from '../datasets/nightingale-data.csv';
import chart from 'customcharts/polarareadiagram';

export default {
  chart,
  data,
  dataTypes: {
    month: 'string',
    army: 'number',
    diseases: 'number',
    wounds: 'number',
    others: 'number',
    diseases_mortality: 'number',
    wounds_mortality: 'number',
    others_mortality: 'number',
  },
  mapping: {
    hierarchy: { value: ['month'] },
    size: { value: 'diseases' },
    color: { value: 'diseases' },
  },
  visualOptions: {
    width: 1000,
    height: 800,
    title: 'Polar Area Chart',
    showLegend: true,
    padding: .5,
  },
};

export const dimensions = [
  {
    id: 'dimensions',
    name: 'Dimensions',
    validTypes: ['number'],
    required: true,
    multiple: true,
    operation: 'get',
  },

  {
    id: "labels",
    name: 'Hover Labels',
    validTypes: ['string', 'number'],
    required: false,
  },

  {
    id: 'classification',
    name: 'Classification',
    validTypes: ['string', 'number'],
    required: false,
  },
]

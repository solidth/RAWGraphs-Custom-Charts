export const visualOptions = {
    //artboard
    title : {
        type: "text",
        label: "Chart title",
        default: "",
        group: "artboard"
    },

    marginTop: {
        type: 'number',
        label: 'Margin (top)',
        default: 50,
        group: 'artboard',
    },

    marginRight: {
        type: 'number',
        label: 'Margin (right)',
        default: 50,
        group: 'artboard',
    },

    marginBottom: {
        type: 'number',
        label: 'Margin (bottom)',
        default: 50,
        group: 'artboard',
    },

    marginLeft: {
        type: 'number',
        label: 'Margin (left)',
        default: 50,
        group: 'artboard',
    },

    analysisMethod: {
        type: 'text',
        label: 'Reduction Method',
        options:  [
            { label: 'PCA', value: 'PCA' },
            { label: 'UMAP', value: 'UMAP' },
            { label: 't-SNE', value: 'TSNE' },
        ],
        default: 'PCA',
        group: 'Dimensionality Reduction',
    },

    //parameter
    epsilon: { // epsilon is learning rate (10 = default)
        type: 'number',
        label: 'Epsilon',
        default: 10,
        group: 't-SNE',
        disabled: {
            analysisMethod: 'PCA'
        },
    },

    perplexity: { // roughly how many neighbors each point influences (30 = default)
        type: 'number',
        label: 'Perplexity',
        default: 30,
        group: 't-SNE',
        disabled: {
            analysisMethod: 'PCA'
        },
    },

    //chart
    dotsRadius: {
        type: 'number',
        label: 'Dots radius',
        default: 5,
        group: 'chart',
    },

    //color
    colorScale: {
        type: 'colorScale',
        label: 'Color scale',
        dimension: 'classification',
        default: {
            scaleType: 'ordinal',
            interpolator: 'interpolateSpectral',
        },
        group: 'color',
    },
}

import data from '../datasets/PredictStudentsDropoutAcademicSuccess.csv'
import chart from 'customcharts/similaritymap'

export default {
    chart,
    data,
    dataTypes: {
        Target_status: 'string',
        Marital_status: 'number',
        Application_mode: 'number',
        Application_order: 'number',
    },
    mapping: {
        // Variable for the Mapping of the Hover Labels.

        dimensions: {
            value: ['Marital_status', 'Application_mode', 'Application_order'],
        },
        labels: {
            value: ['Target_status']
        },
        classification: {
            value: ['Target_status']
        },
    },
    visualOptions: {
        title: "Similarity Map - tsne",
        width: 1200,
        height: 900,
        marginTop: 50,
        marginBottom: 50,
        marginRight: 50,
        marginLeft: 50,
        analysisMethod: 'TSNE',
    },
}

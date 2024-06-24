import { PCA } from 'ml-pca';

export default class PCAAnalysis {
  fit(data) {
    try {
      const pca = new PCA(data);
      const reducedDataObject = pca.predict(data, { nComponents: 2 });

      // Extract the data from the object returned by PCA.predict
      const reducedData = reducedDataObject.data ? reducedDataObject.data.map(row => Array.from(row)) : [];

      return reducedData;
    } catch (error) {
      console.error('Error in PCA fit:', error);
      return [];
    }
  }
}

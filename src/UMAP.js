import { UMAP } from 'umap-js';

export default class UMAPAnalysis {
  fit(data) {
    try {
      const umap = new UMAP({ nComponents: 2 });
      const reducedDataObject = umap.fit(data);

      // Ensure the reduced data is in a 2D array format
      const reducedData = Array.isArray(reducedDataObject) ? reducedDataObject : [];

      return reducedData;
    } catch (error) {
      console.error('Error in UMAP fit:', error);
      return [];
    }
  }
}

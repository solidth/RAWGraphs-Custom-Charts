import * as d3 from 'd3';
import { allTSNEE } from "../tsne";
import PCAAnalysis from '../PCA';
import UMAPAnalysis from '../UMAP';
import '../d3-styles.js';

export function render(node, data, visualOptions, mapping) {
  // Destructure visualOptions
  const {
    width,
    height,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
    background,
    dotsRadius,
    colorScale,
    title,
    epsilon,
    perplexity,
    tickLabelsVisible,
    analysisMethod // Add analysisMethod to choose between TSNE, PCA, and UMAP
  } = visualOptions;

  const {
    titleSize,
    boundWidth,
    boundHeight,
    boundLeft,
    boundTop,
    xAccessor,
    yAccessor,
    reducedDimensions,
    reducedDimensionsClassified
  } = calcProps();
  const xDimension = reducedDimensions.map(point => point[0]);
  const yDimension = reducedDimensions.map(point => point[1]);

  const svg = d3.select(node);
  const bounds = createBounds();
  const { xScale, yScale } = createScales();
  const { xAxis, yAxis } = createAxes();
  const { dots } = drawScatterPoints();

  function calcProps() {
    const minTitleHeight = 300;
    const titleSize = height / 30;

    let boundWidth = width - marginLeft - marginRight;
    let boundHeight = height - marginTop - marginBottom;
    let boundLeft = marginLeft + 12; // lr: why the +12? -> the standard marginLeft parameter is not transferred from visualOptions.js in sandbox
    let boundTop = boundHeight >= minTitleHeight ? marginTop + titleSize : marginTop;

    if (boundHeight >= minTitleHeight) {
      boundHeight -= titleSize;
    }

    const xAccessor = d => d[0];
    const yAccessor = d => d[1];

    const { reducedDimensions, reducedDimensionsClassified } = calcReducedDimensions();

    return { minTitleHeight, titleSize, boundWidth, boundHeight, boundLeft, boundTop, xAccessor, yAccessor, reducedDimensions, reducedDimensionsClassified };
  }


  // function calcReducedDimensions() {
  //   let reducedDimensions, reducedDimensionsClassified;
  //   if (analysisMethod === 'PCA') {
  //     const pca = new PCAAnalysis();
  //     reducedDimensions = pca.fit(data.map(row => row.dimensions));
  //   } else if (analysisMethod === 'UMAP') {
  //     const umap = new UMAPAnalysis();
  //     reducedDimensions = umap.fit(data.map(row => row.dimensions));
  //   } else { // default to TSNE
  //     const opt = { dim: 2, epsilon, perplexity };
  //     var tsne = allTSNEE(opt);
  //     const tsneData = data.map(row => row.dimensions);

  //     tsne.initDataRaw(tsneData);

  //     for (var k = 0; k < 500; k++) {
  //       tsne.step(); // every time you call this, solution gets better
  //     }

  //     reducedDimensions = tsne.getSolution(); // Y is an array of 2-D points that you can plot
  //   }

  //   reducedDimensionsClassified = reducedDimensions.map((e, i) => {
  //     let classification = undefined;
  //     let label = undefined;
  //     if (data[i] && data[i].classification) {
  //       classification = data[i].classification;
  //     }
  //     if (data[i] && data[i].labels) {
  //       label = data[i].labels;
  //     }
  //     return { reducedDimension: e, classification, label };
  //   });

  //   return { reducedDimensions, reducedDimensionsClassified };
  // }

  // Change TSNE initialization to be based on PCA" :
  function calcReducedDimensions() {
    let reducedDimensions, reducedDimensionsClassified;
    const dimensionsData = data.map(row => row.dimensions);
  
    if (analysisMethod === 'PCA') {
      const pca = new PCAAnalysis();
      reducedDimensions = pca.fit(dimensionsData);
    } else if (analysisMethod === 'UMAP') {
      const umap = new UMAPAnalysis();
      reducedDimensions = umap.fit(dimensionsData);
    } else { // default to TSNE
      const pca = new PCAAnalysis();
      const pcaResult = pca.fit(dimensionsData); // Perform PCA first
  
      const tsne = allTSNEE({ dim: 2, epsilon, perplexity, seed: 1234 }); // Add a seed parameter
  
      tsne.initDataRaw(pcaResult); // Use PCA results as input for t-SNE
  
      for (let k = 0; k < 500; k++) {
        tsne.step(); // every time you call this, solution gets better
      }
  
      reducedDimensions = tsne.getSolution(); // Y is an array of 2-D points that you can plot
    }
  
    reducedDimensionsClassified = reducedDimensions.map((e, i) => {
      let classification = undefined;
      let label = undefined;
      if (data[i] && data[i].classification) {
        classification = data[i].classification;
      }
      if (data[i] && data[i].labels) {
        label = data[i].labels;
      }
      return { reducedDimension: e, classification, label };
    });
  
    return { reducedDimensions, reducedDimensionsClassified };
  }
  
  

  function createBounds() {
    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', background);

    if (titleSize) {
      svg.append('text')
        .text(title)
        .attr('x', width / 2)
        .attr('y', marginTop)
        .style("text-anchor", "middle")
        .attr("font-size", titleSize);
    }

    return svg.append("g")
      .attr("transform", `translate(${boundLeft}, ${boundTop})`);
  }

  function createScales() {
    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(xDimension))
      .range([0, boundWidth])
      .nice();

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(yDimension))
      .range([boundHeight, 0])
      .nice();

    return { xScale, yScale };
  }

  function createAxes() {
    const yAxisGenerator = d3.axisLeft()
      .scale(yScale)
      .tickFormat(d3.format(".1e"));
    const yAxis = bounds.append("g")
      .call(yAxisGenerator)
      .attr("text-anchor", "left");
    yAxis.attr("transform", `translate(${0}, 0)`);

    yAxis.selectAll("text")
      .attr("transform", `translate(${0}, 0)`)
      .style("text-anchor", "end");

    const xAxisGenerator = d3.axisBottom()
      .scale(xScale)
      .tickFormat(d3.format(".1e"));
    const xAxis = bounds.append("g")
      .call(xAxisGenerator)
      .attr("transform", `translate(${0}, ${boundHeight})`);

    if (!tickLabelsVisible) {
      yAxis.selectAll("text").remove();
      xAxis.selectAll("text").remove();
    }

    return { xAxis, yAxis };
  }

  function drawScatterPoints() {
    const dots = bounds.selectAll("circle").data(reducedDimensionsClassified);

    function mouseOver(e, d) {
      const x = e.target.cx.animVal.value;
      const y = e.target.cy.animVal.value - 20;
      bounds.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("font-size", 30)
        .attr("class", "similarity-map-point-label")
        .text(d.label);
      console.log(d.label);
    }

    function mouseOut(e, d) {
      bounds.select(".similarity-map-point-label").remove();
    }

    dots.join("circle")
      .attr("cx", d => xScale(xAccessor(d.reducedDimension)))
      .attr("cy", d => yScale(yAccessor(d.reducedDimension)))
      .attr("r", dotsRadius)
      .attr("fill", d => d.classification ? colorScale(d.classification) : "#0365a8")
      .on('mouseover', mouseOver)
      .on('mouseout', mouseOut);

    return dots;
  }
}

import * as d3 from 'd3';
import { legend, labelsOcclusion } from '@rawgraphs/rawgraphs-core';
import '../d3-styles.js';

export function render(
  svgNode,
  data,
  visualOptions,
  mapping,
  originalData,
  styles
) {
  const {
    // artboard
    width,
    height,
    background,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    title,
    // legend
    showLegend,
    legendWidth,
    // chart
    padding,
    rotation,
    // labels
    label1Style,
    label2Style,
    label3Style,
    // colors
    colorScale,
    // labels
    showHierarchyLabels,
    labelHierarchyStyle,
    labelStyles,
    showLabelsOutline,
    autoHideLabels,
  } = visualOptions;

  const margin = {
    top: marginTop,
    right: marginRight,
    bottom: marginBottom,
    left: marginLeft,
  };

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  const radius = Math.min(chartWidth, chartHeight) / 2;

  const svg = d3.select(svgNode)
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height);

  // Add background
  d3.select(svgNode)
    .append('rect')
    .attr('width', showLegend ? width + legendWidth : width)
    .attr('height', height)
    .attr('x', 0)
    .attr('y', 0)
    .attr('fill', background)
    .attr('id', 'background');

  const chartGroup = svg.append('g')
    .attr('transform', `translate(${margin.left + chartWidth / 2},${margin.top + chartHeight / 2})`)
    .attr('id', 'viz');

  // Create the pie layout
  const pie = d3.pie()
    .startAngle(rotation)
    .endAngle(Math.PI*2 + rotation)
    .value(1)
    .sort(null);

  // Map data for pie chart
  const pieData = pie(data);
  const max_rad = d3.max(data, d => d.size) / data.length;
  console.log(pieData)
  console.log(max_rad)

  // Create the arc
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(d => radius * (d.data.size / d3.max(data, d => d.size)) + padding*5);

  console.log(arc)

  // Draw the arcs
  chartGroup.selectAll('path')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', d => colorScale(d.data.color))
    .attr('stroke', 'white')
    .style('stroke-width', padding)
    .on('mouseover', function(event, d) {
      d3.select(this).attr('opacity', 0.7);
      d3.select(`#label-${d.index}`).style('display', 'block');
    })
    .on('mouseout', function(event, d) {
      d3.select(this).attr('opacity', 1);
      d3.select(`#label-${d.index}`).style('display', 'none');
    });

  // Create the arc for label placement
  const labelArc = d3.arc()
    .innerRadius(d => radius * (d.data.size / d3.max(data, d => d.size)) + 10) // Adjust 10 to control distance from the arc
    .outerRadius(d => radius * (d.data.size / d3.max(data, d => d.size)) + 10);

  // Add hidden labels initially
  const textGroups = chartGroup.selectAll('text')
    .data(pieData)
    .enter()
    .append('text')
    .attr('id', d => `label-${d.index}`)
    .attr('transform', function(d) {
      const [x, y] = labelArc.centroid(d);
      return `translate(${x}, ${y})`;
    })
    .attr('dy', '.35em')
    .attr('text-anchor', 'middle')
    .text(d => d.data.hierarchy.get('month')) // Adjust based on the actual hierarchy level needed
    .style('display', 'none');

  // Add title
  if (title) {
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .text(title)
      .attr('dy', '1em');  // Adjust this value to move the title down
  } 

  if (showLabelsOutline) {
    textGroups.styles(styles.labelOutline);
  }

  if (autoHideLabels) {
    labelsOcclusion(textGroups, d => d.size);
  }

  if (showLegend) {
    const legendLayer = d3
      .select(svgNode)
      .append('g')
      .attr('id', 'legend')
      .attr('transform', `translate(${width - legendWidth},${marginTop})`);

    const chartLegend = legend().legendWidth(legendWidth);

    if (mapping.color.value) {
      chartLegend.addColor(mapping.color.value, colorScale);
    }

    legendLayer.call(chartLegend);
  }
}

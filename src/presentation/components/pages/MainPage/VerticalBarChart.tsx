import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import './VerticalBarChart.css'
const data = [
  { category: 'A', quantity: 40 },
  { category: 'B', quantity: 151 },
  { category: 'C', quantity: 89 },
  { category: 'D', quantity: 124 },
]

const VerticalBarChart = () => {
  const d3Chart = useRef()

  useEffect(() => {
    const margin = { top: 50, right: 30, bottom: 30, left: 60 }
    const chartWidth =
      parseInt(d3.select('#d3ChartExample').style('width')) - margin.left - margin.right
    const chartHeight =
      parseInt(d3.select('#d3ChartExample').style('height')) - margin.top - margin.bottom
    const svg = d3
      .select(d3Chart.current)
      .attr('width', chartWidth + margin.left + margin.right)
      .attr('height', chartHeight + margin.top + margin.bottom)
    const x = d3
      .scaleBand()
      .domain(d3.range(data.length))
      .range([margin.left, chartWidth - margin.right])
      .padding(0.1)
    svg
      .append('g')
      .attr('transform', 'translate(0,' + chartHeight + ')')
      .call(
        d3
          .axisBottom(x)
          .tickFormat(i => data[i].category)
          .tickSizeOuter(0),
      )
    const max = d3.max(data, function (d) {
      return d.quantity
    })

    const y = d3.scaleLinear().domain([0, max]).range([chartHeight, margin.top])

    svg
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',0)')
      .call(d3.axisLeft(y))

    svg
      .append('g')
      .attr('fill', '#65f0eb')
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d.quantity))
      .attr('height', d => y(0) - y(d.quantity))
      .attr('width', x.bandwidth())
  })

  return (
    <div id="d3ChartExample">
      <svg ref={d3Chart}></svg>
    </div>
  )
}

export default VerticalBarChart

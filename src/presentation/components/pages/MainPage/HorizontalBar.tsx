import jsonFile from 'presentation/assets/json/global.json'
import * as d3 from 'd3'
import React, { useRef, useEffect, RefObject } from 'react'
import './HorizontalBar.css'

//Sacar los valores del JSON
const positionSector = jsonFile.reduce((acc, item: any) => {
  const value = item['Position sector']
  if (value) acc[value] = (acc[value] || 0) + 1
  return acc
}, {} as { [i: string]: number })

//Crear el grafico
const useBuildGraph = (ref: RefObject<SVGSVGElement>, data: number[]) => {
  useEffect(() => {
    const buildGraph = (data: number[]) => {
      const width = 750,
        height = 375,
        scaleFactor = 20,
        barHeight = 20

      const graph = d3
        .select(ref.current)
        .attr('width', width)
        .attr('height', height)
        .style('background', '#d3d3d3')
        .style('margin', '15')
        .style('padding', '5')

      const bar = graph
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', function (d, i) {
          return 'translate(0,' + i * barHeight + ')'
        })

      bar
        .append('rect')
        .attr('width', function (d) {
          return d * scaleFactor
        })
        .attr('height', barHeight - 1)

      bar
        .append('text')
        .attr('x', function (d) {
          return d * scaleFactor
        })
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(function (d) {
          return d
        })
    }
    buildGraph(data)
  }, [ref, data])
}

const HorizontalBar = () => {
  const ref = useRef<SVGSVGElement>(null)

  useBuildGraph(ref, Object.values(positionSector))

  return (
    <div className="svg">
      <svg ref={ref}></svg>
    </div>
  )
}

export default HorizontalBar

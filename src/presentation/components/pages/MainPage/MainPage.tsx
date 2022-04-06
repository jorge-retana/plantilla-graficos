import jsonFile from 'presentation/assets/json/global_database.json'
import * as d3 from 'd3'
import React, { useRef, useEffect, RefObject } from 'react'
import './MainPage.css'

//Crear el grafico
const useBuildGraph = (ref: RefObject<SVGSVGElement>, data: number[]) => {
  useEffect(() => {
    const buildGraph = (data: number[]) => {
      const width = 200,
        scaleFactor = 10,
        barHeight = 20

      const graph = d3
        .select(ref.current)
        .attr('width', width)
        .attr('height', barHeight * data.length)

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

//Sacar los valores del JSON
const businessSector = jsonFile.reduce((acc, item: any) => {
  const value = item['Business Sector']
  if (value) acc[value] = (acc[value] || 0) + 1
  return acc
}, {} as { [i: string]: number })

console.log('businessSector', businessSector)

const MainPage = () => {
  const ref = useRef<SVGSVGElement>(null)

  useBuildGraph(ref, Object.values(businessSector))

  return (
    <div className="svg">
      <svg className="container ml-5" ref={ref}></svg>
      {/* <Chart/> */}
    </div>
  )
}

export default MainPage

import React from 'react'
import { Bar } from 'react-chartjs-2'

const data = {
  labels:["primero", "segundo" ,"tercero"],
  datasets: [
    {
      label: 'New Confirmed',
      data: [1,2,3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}
const options = {
  scales: {
    yAxis: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}
/*const ChartWrapper = styled.div`
max-width: 700px;
margin: 0 auto;`*/

const Chart: React.FunctionComponent = () => {
  return <Bar type="bar" data={data} options={options} />
}

export default Chart

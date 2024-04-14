import React from 'react';
const Chart = ({ children, width, height }) => (
  <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
    {children}
  </svg>
)

const Bar = ({ x, y, width, height }) => (
  <rect x={x} y={y} width={width} height={height} />
)

const BarChart = ({ data }) => {
  // Width of each bar
  const itemWidth = 20

  // Distance between each bar
  const itemMargin = 5

  const dataLength = data.length

  // Normalize data, we'll reduce all sizes to 25% of their original value
  const massagedData = data.map(datum =>
    Object.assign({}, datum, { repos: datum.repos * 0.25 })
  )

  const mostRepos = massagedData.reduce((acc, cur) => {
    const { repos } = cur
    return repos > acc ? repos : acc
  }, 0)

  const chartHeight = mostRepos

  return (
    <Chart width={dataLength * (itemWidth + itemMargin)} height={chartHeight}>
      {massagedData.map((datum, index) => {
        const itemHeight = datum.repos

        return (
          <Bar
            x={index * (itemWidth + itemMargin)}
            y={chartHeight - itemHeight}
            width={itemWidth}
            height={itemHeight}
          />
        )
      })}
    </Chart>
  )
}

export default BarChart;


{/* <BarChart data={[{name:"1",repos:30},{name:"2",repos:30},{name:"3",repos:80}]}/> */ }

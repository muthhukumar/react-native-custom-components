import * as React from 'react'
import {StyleSheet} from 'react-native'
import {VictoryLabel, VictoryAnimation, VictoryPie} from 'victory-native'
import Svg from 'react-native-svg'

export const ProgressPieChart = props => {
  const {
    percentage = 0,
    size = 65,
    barDarkColor = '#0000ff',
    barLightColor = '#ccccff',
    percentageStyle,
  } = props

  const data = [
    {x: 1, y: percentage},
    {x: 2, y: 100 - percentage},
  ]

  return (
    <Svg viewBox="0 0 400 400" width={+size} height={+size}>
      <VictoryPie
        standalone={false}
        animate={{duration: 1000}}
        width={400}
        height={400}
        data={data}
        innerRadius={120}
        cornerRadius={25}
        labels={() => null}
        style={{
          data: {
            fill: ({datum}) => {
              /**
               * { x: 1 } has the actual percentage and here setting the blue color if the current x
               * equal 1 and vice versa.
               */
              return datum.x === 1 ? barDarkColor : barLightColor
            },
          },
        }}
      />
      <VictoryAnimation duration={1000} data={data}>
        {() => {
          return (
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={200}
              y={200}
              text={`${percentage}%`}
              style={[styles.percentage, percentageStyle]}
            />
          )
        }}
      </VictoryAnimation>
    </Svg>
  )
}

const styles = StyleSheet.create({
  percentage: {
    fontSize: 60,
    fontFamily: 'bold',
  },
})

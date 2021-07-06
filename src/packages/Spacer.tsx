import * as React from 'react'
import { View } from 'react-native'

export const Spacer = ({ y, x }) => {
  return <View style={[{ width: x, height: y }]} />
}

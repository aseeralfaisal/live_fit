import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DateBoxSVG from '../assets/icons/date_box.svg'

export const GradiantRoundBox = ({ title, color }: { title: string; color: string }) => {
  const DATE = new Date().toISOString().split('T')[0].toString()
  return (
    <View>
      <DateBoxSVG />
      <Text
        style={{ color: color ? color : '#000', marginTop: -31, marginLeft: 30, fontFamily: 'Poppins_Bold' }}>
        {title}
      </Text>
    </View>
  )
}

import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import DateBoxSVG from '../assets/icons/date_box.svg'

export const DateBoxMain = () => {
  const DATE = new Date().toISOString().split('T')[0].toString()
  return (
    <View>
      <DateBoxSVG />
      <Text style={{ color: '#fff', marginTop: -28, marginLeft: 30, fontFamily: 'Poppins' }}>Today</Text>
    </View>
  )
}

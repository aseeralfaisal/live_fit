import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface propTypes {
  title: string
  onPress: Function
  horizontalMargin: number
}
const MainButton = ({ title, onPress, horizontalMargin }: propTypes) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={[styles.Btn, { marginHorizontal: horizontalMargin && horizontalMargin }]}
      onPress={() => onPress()}>
      <Text style={styles.BtnText}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  Btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#92A3FD',
    marginHorizontal: 30,
    height: 50,
    borderRadius: 20,
    marginBottom: 20,
  },
  BtnText: {
    color: '#fff',
    fontFamily: 'Poppins_Bold',
    textAlignVertical: 'center',
    fontSize: 14,
  },
})

export default MainButton

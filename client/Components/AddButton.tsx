import React from 'react'
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import AddBtnSVG from '../assets/add-btn.svg'

export const AddButton = () => {
  // return <AddBtnSVG />
  return (
    <Image source={require('../assets/add-btn.png')} style={styles.addbtn} />
  )
}

const styles = StyleSheet.create({
  addbtn: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  }
})

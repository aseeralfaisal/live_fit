import React from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import BtnSVG from '../assets/btn.svg'

interface propTypes {
  title: string
}

export const Btn = (props: propTypes) => {
  const { title } = props
  return (
    <View>
      <BtnSVG />
      <Text style={styles.btnTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  btnTitle: {
    color: '#fff',
    position: 'absolute',
    fontFamily: 'Poppins_Bold',
    alignSelf: 'center',
    marginTop: '7%',
    fontSize: 16,
  },
})

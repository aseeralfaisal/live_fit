import React from 'react'
import { StyleSheet, Text, Image, View, ActivityIndicator } from 'react-native'
import BtnSVG from '../assets/btn.svg'

interface propTypes {
  title: string,
  loading: boolean
}

export const Btn = (props: propTypes) => {
  const { title, loading } = props
  return (
    <View>
      <BtnSVG />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size={24} color='#fff' />
        </View>
      )}
      <Text style={styles.btnTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loader: {
    color: '#fff',
    position: 'absolute',
    fontFamily: 'Poppins_Bold',
    alignSelf: 'flex-start',
    marginTop: '7%',
    marginLeft: '27%',
    fontSize: 16,
  },
  btnTitle: {
    color: '#fff',
    position: 'absolute',
    fontFamily: 'Poppins_Bold',
    alignSelf: 'center',
    marginTop: '7%',
    fontSize: 16,
  },
})

import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import Header from '../Components/Header'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import MainButton from '../Components/MainButton'
import { UserWorkouts } from '../Components/Sections/UserWorkouts'

export default function Workouts() {
  const navigation = useNavigation<any>()
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Header />
        <UserWorkouts />
        <MainButton
          title='Create a workout'
          horizontalMargin='default'
          onPress={() => {
            navigation.navigate('ChooseExercises')
          }}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  txt: {
    marginHorizontal: 30,
    fontFamily: 'Poppins_Bold',
    color: 'rgb(80,80,80)',
    fontSize: 20,
  },
  tileTitle: {
    fontFamily: 'Poppins_Bold',
    color: '#555',
    textTransform: 'capitalize',
    fontSize: 14,
    width: 155,
    borderRadius: 10,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  input: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontSize: 20,
    marginHorizontal: 20,
  },
  inputTextField: {
    width: 250,
    marginHorizontal: 10,
  },
})

import * as React from 'react'
import { View } from 'react-native'
import Header from '../Components/Header'
import { useColorScheme } from 'react-native-appearance'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setIsAuthenticated } from '../redux/states/authenticatedSlice'
import MainButton from '../Components/MainButton'

export default function About() {
  let colorScheme = useColorScheme()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <Header />
      <MainButton
        title='Sign out'
        onPress={() => {
          dispatch(setIsAuthenticated(false))
        }}
      />
    </View>
  )
}

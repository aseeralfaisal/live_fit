import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'react-native-appearance'
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

type NavigationList = {
  about: undefined
}
export default function Header() {
  const navigation = useNavigation<NavigationProp<NavigationList>>()
  const route = useRoute()
  let colorScheme = useColorScheme()

  console.log(route.name)

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../assets/icons/avatar.png')}
          style={{ width: 50, resizeMode: 'contain' }}
        />
        <View style={{ marginLeft: -90 }}>
          <Text style={{ color: '#aaa', fontFamily: 'Poppins' }}>Welcome</Text>
          <Text style={styles.userName}>Freaky Aseer</Text>
        </View>
        <TouchableOpacity activeOpacity={0.5}>
          <Image
            source={require('../assets/icons/calendar.png')}
            style={{ width: 50, resizeMode: 'contain' }}
          />
        </TouchableOpacity>
        <StatusBar style='dark' />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -40,
    marginBottom: -60,
    marginHorizontal: 28,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Poppins_Bold',
    color: '#555',
  },
})

import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useAppSelector } from '../redux/hooks'
import { useNavigation, useRoute } from '@react-navigation/native'

export default function Header({ CreateUpdateWorkout, setCreateWorkoutPopup }: any) {
  const route = useRoute()
  const routeName = route.name
  const userVal = useAppSelector((state) => state.user.userVal)
  const navigation = useNavigation()

  if (routeName === 'TargetExercise') {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            paddingTop: 50,
            paddingBottom: 10,
            marginBottom: 20,
          }}>
          <TouchableOpacity activeOpacity={0.2} onPress={() => navigation.goBack()}>
            <Text style={styles.actionTitles}>Discard</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add Exercise</Text>
          <TouchableOpacity activeOpacity={0.2} onPress={() => setCreateWorkoutPopup(true)}>
            <Text style={styles.actionTitles}>Create</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style='dark' />
      </>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/icons/avatar.png')}
            style={{ width: 50, resizeMode: 'contain' }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: '#aaa', fontFamily: 'Poppins' }}>Welcome</Text>
            <Text style={styles.userName}>{userVal}</Text>
          </View>
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
    fontSize: 16,
    fontFamily: 'Poppins_Bold',
    color: '#555',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'Poppins_Bold',
  },
  actionTitles: {
    fontSize: 14,
    color: '#92A3FD',
    fontFamily: 'Poppins_Bold',
  },
})

import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, FlatList } from 'react-native'
import Header from '../Components/Header'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { useNavigation, NavigationProp, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import * as React from 'react'
import { UserWorkouts } from '../Components/Sections/UserWorkouts'
import { BASE_URI } from '../URI'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../redux/hooks'
import axios from 'axios'
import { GET_USER_INFO } from '../Queries/GET_USER_INFO'
import { changeBmi } from '../redux/states/bmiSLice'
import { bmiColors } from '../Reusables/bmiColors'
import { fillColor } from '../Reusables/fillColor'
// import { BASE_URI } from '@env'

type navigationList = {
  FoodScan: undefined
  Workouts: undefined
  BMI: undefined
  WalkSteps: undefined
  Cals: undefined
}

export default function Home() {
  const dispatch = useDispatch()
  const bmi = useAppSelector((state) => state.bmi.bmi)
  const userName = useAppSelector((state) => state.user.userVal)
  const navigation = useNavigation<NavigationProp<navigationList>>()
  const [fillCircle, setfillCircle] = React.useState(0)
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const usingHermes = typeof HermesInternal === 'object' && HermesInternal !== null

  const getUserInfos = async () => {
    const res = await axios.post(BASE_URI, {
      query: GET_USER_INFO,
      variables: {
        user: userName,
      },
    })
    return res.data.data.getUserInfo
  }
  React.useEffect(() => {
    let ignore = false;
    (async () => {
      const userData = await getUserInfos()
      const bmiVal = (userData.weight / Math.pow(userData.height, 2)).toFixed(2)
      const fill = (+bmiVal / 25) * 100
      setfillCircle(fill)
      dispatch(changeBmi(+bmiVal.toString()))
    })()
    return () => {
      ignore = true
    }
  }, [bmi, userInfo])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Header />
      {!usingHermes ? null : (
        <View style={styles.engine}>
          <Text style={styles.footer}>Engine: Hermes</Text>
        </View>
      )}
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('BMI')}>
        <LinearGradient colors={['#92A3FD', '#9DCEFF']} style={styles.gradientBar}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{ alignItems: 'center' }}>
              <AnimatedCircularProgress
                size={80}
                width={10}
                fill={fillCircle}
                tintColor={fillColor()}
                backgroundColor='#3d5875'
              />
              <Text
                style={{
                  position: 'absolute',
                  marginTop: 27,
                  color: '#fff',
                  fontFamily: 'Poppins_Bold',
                  fontSize: 16,
                }}>
                {bmi}
              </Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <Text style={[styles.topbarText, { fontWeight: 'bold' }]}>Mass Index</Text>
              <Text style={[styles.topbarText, { width: 170 }]}>Normal weight</Text>
            </View>
            <Image
              source={require('../assets/icons/workout_btn.png')}
              style={{ resizeMode: 'contain', width: 40 }}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('Cals')}>
        <LinearGradient
          colors={['#C58BF255', '#EEA4CE33']}
          style={[styles.gradientBar, { height: 100, marginTop: 15 }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/icons/calories.png')}
              style={{ resizeMode: 'contain', width: 80 }}
            />
            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.textDark}>Calories</Text>
              <Text style={styles.textDarkLighter}>Check your calorie intake</Text>
            </View>
          </View>
          <Image
            source={require('../assets/icons/workout_btn.png')}
            style={{ resizeMode: 'contain', width: 40 }}
          />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.5}
        style={{ marginTop: 20 }}
        onPress={() => navigation.navigate('ChooseExercises')}>
        <LinearGradient
          colors={['#C58BF255', '#EEA4CE33']}
          style={[styles.gradientBar, { height: 100, marginBottom: 20 }]}>
          <Image
            source={require('../assets/icons/home_workout.png')}
            style={{ resizeMode: 'contain', width: 70, marginHorizontal: 10 }}
          />
          <View style={{ marginLeft: -10 }}>
            <Text style={styles.textDark}>Workout</Text>
            <Text style={styles.textDarkLighter}>Create and log your workouts</Text>
          </View>
          <Image
            source={require('../assets/icons/workout_btn.png')}
            style={{ resizeMode: 'contain', width: 40 }}
          />
        </LinearGradient>
      </TouchableOpacity>
      <UserWorkouts />
      <StatusBar style='dark' />
    </View>
  )
}

const styles = StyleSheet.create({
  topbarText: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'flex-start',
    marginHorizontal: 5,
    marginVertical: 5,
    fontFamily: 'Poppins',
  },
  txt: {
    marginHorizontal: 30,
    fontFamily: 'Poppins_Bold',
    color: 'rgb(80,80,80)',
    fontSize: 20,
    marginTop: 30,
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
  gradientBar: {
    padding: 15,
    borderRadius: 16,
    marginHorizontal: 20,
    height: 115,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradientBar2: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 30,
    height: 200,
    width: '40%',
    marginVertical: 20,
  },
  textLight: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Poppins',
  },
  textDark: {
    fontSize: 16,
    color: '#000',
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
  textDarkLighter: {
    fontSize: 15,
    color: '#A4A9AD',
    fontFamily: 'Poppins',
    fontWeight: '500',
    width: 180,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})

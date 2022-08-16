import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import Header from '../Components/Header'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import { setWorkoutName, setWorkouts, setExerciseTarget } from '../redux/states/workoutSlice'
import FormSVG from '../assets/form.svg'

export default function Workouts() {
  const navigation = useNavigation<any>()
  const dispatch = useDispatch()
  const userVal = useAppSelector((state) => state.user.userVal)
  const workouts = useAppSelector((state) => state.workout.workouts)

  const BASE_URL = 'https://livefitv2.herokuapp.com/graphql'

  const targetBodyPart = [
    { name: 'chest', img: require(`../assets/imgs/chest.png`) },
    { name: 'back', img: require(`../assets/imgs/back.png`) },
    { name: 'shoulders', img: require(`../assets/imgs/shoulders.png`) },
    { name: 'arms', img: require(`../assets/imgs/arms.png`) },
    { name: 'legs', img: require(`../assets/imgs/legs.png`) },
  ]
  const GET_USER_WORKOUTS = `mutation GetUserWorkouts($userName: String!) {
    getUserWorkouts(userName: $userName) {
      workoutName
    }
  }`
  React.useEffect(() => {
    let isMounted = true
    const getWorkoutList = async () => {
      const fetchData = await axios.post(BASE_URL, {
        query: GET_USER_WORKOUTS,
        variables: {
          userName: userVal,
        },
      })
      const { getUserWorkouts } = fetchData.data.data
      return getUserWorkouts
    }
    if (isMounted) {
      getWorkoutList()
        .then((response) => dispatch(setWorkouts(response)))
        .catch((err) => console.log(err))
    }
    return () => {
      getWorkoutList()
      isMounted = false
    }
  }, [])

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Header />
        <View style={{ paddingHorizontal: 15 }}>
          <Text style={styles.txt}>Your Workouts</Text>
          <FlatList
            data={workouts}
            renderItem={({ item }) => {
              const { workoutName }: any = item
              return (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setWorkoutName(workoutName))
                    navigation.navigate('UserExercises')
                  }}>
                  <LinearGradient
                    colors={['#C58BF233', '#92A3FD33']}
                    style={{
                      marginHorizontal: 16,
                      marginVertical: 8,
                      borderRadius: 12,
                      flexDirection: 'row',
                    }}>
                    {/* <Image
                      source={require('../assets/form.png')}
                      style={{ width: 60, height: 60, resizeMode: 'contain', marginLeft: 10 }}
                    /> */}
                    <Text
                      style={[
                        styles.tileTitle,
                        { textAlign: 'left', color: '#555', margin: 10, padding: 10 },
                      ]}>
                      <Text>⭐ </Text>
                      {workoutName.replace('_', ' ').toString()}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, idx) => idx.toString()}
          />
          <Text style={styles.txt}>Explore</Text>
          <FlatList
            data={targetBodyPart}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1 / 2,
                    flexDirection: 'column',
                    marginVertical: 9,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setExerciseTarget(item.name))
                      navigation.navigate('TargetExercise')
                    }}>
                    <LinearGradient
                      colors={['#C58BF233', '#EEA4CE22']}
                      style={{ alignItems: 'center', borderRadius: 15 }}>
                      <View
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 100,
                          alignItems: 'center',
                          overflow: 'hidden',
                          paddingTop: '15%',
                        }}>
                        <Image
                          source={item.img}
                          style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 100 }}
                        />
                      </View>
                      <View
                        style={{
                          borderBottomLeftRadius: 13,
                          borderBottomRightRadius: 13,
                          borderTopLeftRadius: 3,
                          borderTopRightRadius: 3,
                          opacity: 0.85,
                          width: 145,
                          paddingBottom: 10,
                        }}>
                        <Text style={styles.tileTitle}>{item.name}</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )
            }}
            numColumns={2}
            keyExtractor={(_, idx) => idx.toString()}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  txt: {
    marginHorizontal: 8,
    fontFamily: 'Poppins_Bold',
    color: 'rgb(80,80,80)',
    fontSize: 20,
  },
  tileTitle: {
    fontFamily: 'Poppins_Bold',
    // color: '#92A3FD',
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

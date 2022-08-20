import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import Header from '../Components/Header'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import { setWorkoutName, setWorkouts, setExerciseTarget } from '../redux/states/workoutSlice'
import { Btn } from '../Components/Button'

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
  }, [workouts])

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Header />
        <Text style={styles.txt}>Your Workouts</Text>
        <View
          style={{
            flex: 1,
            marginTop: 14,
          }}>
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
                      marginHorizontal: 20,
                      marginVertical: 8,
                      borderRadius: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 60,
                    }}>
                    <Image
                      source={require('../assets/icons/exer_dark.png')}
                      style={{ width: 40, height: 40, resizeMode: 'contain', marginLeft: 10 }}
                    />
                    <Text
                      style={[styles.tileTitle, { textAlign: 'left', color: '#555', marginHorizontal: 10 }]}>
                      {workoutName.replace('_', ' ').toString()}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item, idx) => idx.toString()}
          />
        </View>
        <TouchableOpacity
          style={styles.saveWorkoutBtn}
          onPress={() => {
            navigation.navigate('ChooseExercises')
          }}>
          <Text style={styles.saveWorkoutBtnText}>Create a workout</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  saveWorkoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#92A3FD',
    marginHorizontal: 30,
    height: 50,
    borderRadius: 20,
    marginBottom: 20,
  },
  saveWorkoutBtnText: {
    color: '#fff',
    fontFamily: 'Poppins_Bold',
    textAlignVertical: 'center',
    fontSize: 14,
  },
  txt: {
    marginHorizontal: 20,
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

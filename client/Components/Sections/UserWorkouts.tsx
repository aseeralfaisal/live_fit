import axios from 'axios'
import * as React from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useAppSelector } from '../../redux/hooks'
// import { BASE_URI } from '@env'
import { BASE_URI } from '../../URI'
import { useDispatch } from 'react-redux'
import { setWorkoutName, setWorkouts } from '../../redux/states/workoutSlice'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GradiantRoundBox } from '../GradiantRoundBox'

export const UserWorkouts = () => {
  const navigation = useNavigation<any>()
  const route = useRoute()
  const routeName = route.name
  const userVal = useAppSelector((state) => state.user.userVal)
  const workouts = useAppSelector((state) => state.workout.workouts)
  const dispatch = useDispatch()
  const [workoutListLoader, setWorkoutListLoader] = React.useState(true)

  const GET_USER_WORKOUTS = `mutation GetUserWorkouts($userName: String!) {
        getUserWorkouts(userName: $userName) {
          workoutName
        }
      }`

  const getWorkoutList = React.useCallback(async () => {
    const fetchData = await axios.post(BASE_URI, {
      query: GET_USER_WORKOUTS,
      variables: {
        userName: userVal,
      },
    })
    const { getUserWorkouts } = fetchData.data.data
    return getUserWorkouts
  }, [])
  React.useEffect(() => {
    let isMounted = true
    getWorkoutList().then((data) => {
      if (isMounted) {
        setWorkoutListLoader(false)
        dispatch(setWorkouts(data))
      }
    })
    return () => {
      isMounted = false
    }
  }, [workouts])

  return (
    <>
      <View style={styles.headerSection}>
        <Text style={styles.title}>Your Workouts</Text>
        {routeName === 'Home' ? (
          <TouchableOpacity onPress={() => navigation.navigate('Workouts')}>
            <Text style={styles.titleAction}>See All</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 14,
        }}>
        <FlatList
          data={workouts}
          renderItem={({ item }) => {
            const { workoutName } = item
            return (
              <TouchableOpacity
                onPress={() => {
                  dispatch(setWorkoutName(workoutName))
                  navigation.navigate('UserExercises')
                }}>
                <LinearGradient
                  colors={['#C58BF211', '#EEA4CE11']}
                  style={{
                    marginHorizontal: 25,
                    marginVertical: 8,
                    borderRadius: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 60,
                    borderColor: "#C58BF277",
                    borderWidth: 1
                  }}>
                  <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Image
                      source={require('../../assets/icons/exer_dark.png')}
                      style={styles.userWorkoutIcon}
                    />
                    <Text
                      style={[styles.tileTitle, { textAlign: 'left', color: '#777', marginHorizontal: 10 }]}>
                      {workoutName.replace('_', ' ').toString()}
                    </Text>
                    <Text style={styles.viewMore}>View More</Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            )
          }}
          keyExtractor={(item, idx) => idx.toString()}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    alignItems: 'center',
  },
  userWorkoutIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    borderRadius: 100,
    marginLeft: 10,
  },
  title: {
    fontFamily: 'Poppins_Bold',
    color: '#777',
    fontSize: 18,
  },
  titleAction: {
    fontFamily: 'Poppins_Bold',
    color: '#999',
    fontSize: 14,
  },
  tileTitle: {
    fontFamily: 'Poppins_Bold',
    color: '#777',
    textTransform: 'capitalize',
    fontSize: 14,
    width: 155,
    borderRadius: 10,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  viewMore: {
    fontFamily: 'Poppins_Bold',
    color: '#AEAFCE',
    // backgroundColor: '#fff',
    padding: 6,
    borderRadius: 10,
    borderWidth: 0,
    borderColor: "#eee",
    fontSize: 14,
    marginLeft: 20,
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

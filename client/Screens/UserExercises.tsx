import * as React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import Header from '../Components/Header'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useRoute } from '@react-navigation/native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { Btn } from '../Components/Button'

export default function UserExercises() {
  const dispatch = useDispatch()
  const userVal = useAppSelector((state) => state.user.userVal)
  const route: any = useRoute()
  const workoutName = route.params.workoutName
  const [UserExercises, setUserExercises] = React.useState(null)
  const window = Dimensions.get('window')
  const [set, setSet] = React.useState<string>('')
  const [reps, setReps] = React.useState<string>('')
  const [weight, setWeight] = React.useState<string>('')
  const [isSetAdded, setIsSetAdded] = React.useState(false)

  const BASE_URL = 'https://livefitv2.herokuapp.com/graphql'
  React.useEffect(() => {
    const getUserExercises = async () => {
      const GET_EXERCISE_QUERY = `mutation GetUserWorkout($userName: String!, $workoutName: String!) {
        getUserWorkout(userName: $userName, workoutName: $workoutName) {
          workoutName
          userName
          exercises {
            equipment
            gifUrl
            id
            name
            target
            sets {
              reps
              set
              weight
            }
          }
        }
      }`

      const res = await axios.post(BASE_URL, {
        query: GET_EXERCISE_QUERY,
        variables: {
          userName: userVal,
          workoutName: workoutName,
        },
      })
      const { getUserWorkout } = res.data.data
      console.log(getUserWorkout)
      getUserWorkout.map(({ exercises }: any) => setUserExercises(exercises))
    }
    getUserExercises()
    return () => {
      getUserExercises()
    }
  }, [isSetAdded])

  const addSet = async (exerciseName: string) => {
    const ADD_SET_QUERY = `mutation AddSetsReps($setsReps: [setRepsWeightinput], $userName: String, $workoutName: String, $exerciseName: String) {
      addSetsReps(setsReps: $setsReps, userName: $userName, workoutName: $workoutName, exerciseName: $exerciseName) {
        workoutName
        userName
        exercises {
          equipment
          gifUrl
          id
          name
          target
          sets {
            set
            reps
            weight
          }
        }
      }
    }`

    const res = await axios.post(BASE_URL, {
      query: ADD_SET_QUERY,
      variables: {
        setsReps: [
          {
            set: +set,
            reps: +reps,
            weight: +weight,
          },
        ],
        userName: userVal,
        workoutName: 'Workout_NEW',
        exerciseName: exerciseName,
      },
    })
    if (res.status) {
      setIsSetAdded(!isSetAdded)
    }
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Header />
        <Text style={[styles.txt, { marginHorizontal: 20 }]}>Exercises</Text>
        <View
          style={{
            marginTop: 14,
            backgroundColor: 'rgba(100,100,100,0.05)',
            marginHorizontal: 20,
            borderRadius: 12,
          }}>
          <FlatList
            data={UserExercises}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    borderColor: 'rgba(100,100,100,0.2)',
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    marginHorizontal: 20,
                  }}></View>
              )
            }}
            renderItem={({ item: set }: any) => {
              return (
                <>
                  <View
                    style={{
                      marginHorizontal: window.width - window.width / 1.05,
                      padding: 8,
                      borderRadius: 8,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginVertical: 5,
                        }}>
                        <View
                          style={{
                            width: 65,
                            height: 65,
                            borderRadius: 100,
                            overflow: 'hidden',
                          }}>
                          <Image
                            source={{ uri: set.gifUrl }}
                            style={{
                              width: 65,
                              height: 65,
                              borderWidth: 0,
                              borderRadius: 100,
                            }}
                          />
                        </View>
                        <Text style={[styles.titleTxt, { marginLeft: 15, color: '#555' }]}>
                          {set.name.split(' ')[0]} {set.name.split(' ')[1]} {set.name.split(' ')[2]}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <FlatList
                      data={set.sets}
                      renderItem={({ item, index }) => {
                        // console.log(set.sets.length - 1, index)
                        return (
                          <View>
                            {/* <Text style={styles.titleTxt}>{set.sets.length.toString()}</Text>
                            <Text style={styles.titleTxt}>{index}</Text> */}
                            <View
                              style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'center' }}>
                              <TextInput
                                value={set}
                                onChangeText={(text) => setSet(text)}
                                placeholder={item.set.toString()}
                                keyboardType='numeric'
                                style={styles.SetRepInput}
                                placeholderTextColor="#555"
                                editable={set.sets.length - 1 === index ? true : false}
                              />
                              <Text style={{ marginVertical: 17, marginHorizontal: 5, color: '#555' }}>
                                X
                              </Text>
                              <TextInput
                                value={reps}
                                onChangeText={(text) => setReps(text)}
                                placeholder={item.reps.toString()}
                                keyboardType='numeric'
                                style={styles.SetRepInput}
                                placeholderTextColor="#555"
                                editable={set.sets.length - 1 === index ? true : false}
                              />
                              <TextInput
                                value={weight}
                                onChangeText={(text) => setWeight(text)}
                                placeholder={item.weight.toString()}
                                keyboardType='numeric'
                                style={styles.SetRepInput}
                                placeholderTextColor="#555"
                                editable={set.sets.length - 1 === index ? true : false}
                              />
                            </View>
                          </View>
                        )
                      }}
                      keyExtractor={(_, idx) => idx.toString()}
                    />
                    <TouchableOpacity
                      onPress={() => addSet(set.name)}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#ccc',
                        borderRadius: 8,
                        height: 40,
                      }}>
                      <Text style={styles.titleTxt}>Add Set</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )
            }}
            numColumns={1}
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
  titleTxt: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    textTransform: 'capitalize',
    color: 'rgb(80,80,80)',
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  tile: {
    borderRadius: 10,
    backgroundColor: '#ecf4f7',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    width: 180,
    padding: 5,
    marginHorizontal: 15,
  },
  SetRepInput: {
    width: 55,
    height: 55,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
})

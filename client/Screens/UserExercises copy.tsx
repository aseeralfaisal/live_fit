import * as React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import Header from '../Components/Header'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useRoute } from '@react-navigation/native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import Checkbox from 'expo-checkbox'

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

  const [selectedSet, setSelectedSet] = React.useState(1)

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
            overflow: 'scroll',
          }}>
          <FlatList
            scrollEnabled
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
            renderItem={({ item: set, dex }: any) => {
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
                      horizontal
                      renderItem={({ item, index }) => {
                        return (
                          <Pressable onPressIn={() => setSelectedSet(index + 1)}>
                            <View style={{ marginVertical: 20 }}>
                              <Text
                                style={[
                                  styles.setTitle,
                                  { backgroundColor: selectedSet === index + 1 ? '#ccc' : '#fff' },
                                ]}>
                                Set {index + 1}
                              </Text>
                            </View>

                            {/* {index === 0 && (
                              <View
                                style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
                                <Text style={styles.setRepsWeightTitle}>Set</Text>
                                <Text style={styles.setRepsWeightTitle}>Reps</Text>
                                <Text style={styles.setRepsWeightTitle}>Weight</Text>
                              </View>
                            )} */}
                            {/* <TouchableOpacity
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                margin: 10,
                                padding: 7,
                                borderRadius: 8,
                                backgroundColor: '#fff',
                                // borderWidth: .5,
                                borderColor: '#ccc',
                              }}>
                              <TextInput
                                value={(index + 1)?.toString()}
                                editable={false}
                                style={styles.setRepsInput}
                              />
                              <TextInput
                                value={item?.reps?.toString()}
                                placeholder='Reps'
                                editable={false}
                                style={styles.setRepsInput}
                              />
                              <TextInput
                                value={item?.weight?.toString()}
                                placeholder='Weight'
                                editable={false}
                                style={styles.setRepsInput}
                              />
                            </TouchableOpacity> */}
                            {/* {index === set.sets.length - 1 && (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-around',
                                  margin: 10,
                                  padding: 7,
                                  borderRadius: 8,
                                  backgroundColor: '#fff',
                                }}>
                                <TextInput
                                  value={(index + 2)?.toString()}
                                  editable={false}
                                  style={styles.setRepsInput}
                                />
                                <TextInput
                                  value={reps}
                                  placeholder='Reps'
                                  onChangeText={(txt) => setReps(txt)}
                                  editable={true}
                                  style={styles.setRepsInput}
                                />
                                <TextInput
                                  value={weight}
                                  placeholder='Weight'
                                  onChangeText={(txt) => setWeight(txt)}
                                  editable={true}
                                  style={styles.setRepsInput}
                                />
                              </View>
                            )} */}
                          </Pressable>
                        )
                      }}
                      keyExtractor={(_, idx) => idx.toString()}
                    />
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                      }}>
                      <TextInput placeholder='Set' style={styles.setRepsInput} />
                      <TextInput placeholder='Reps' style={styles.setRepsInput} />
                    </View>
                    <TouchableOpacity
                      onPress={() => addSet(set.name)}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#92A3FD33',
                        borderRadius: 8,
                        height: 40,
                        margin: 10,
                      }}>
                      <Text style={[styles.titleTxt, { color: '#555' }]}>Add Set</Text>
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
    color: '#555',
    fontSize: 20,
  },
  setRepsWeightTitle: {
    fontFamily: 'Poppins_Bold',
    color: '#777',
    fontSize: 14,
  },
  setTitle: {
    backgroundColor: '#fff',
    padding: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  titleTxt: {
    fontFamily: 'Poppins',
    fontWeight: '700',
    textTransform: 'capitalize',
    color: 'rgb(80,80,80)',
    fontSize: 14,
  },
  setRepsInput: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    marginHorizontal: 5
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
})

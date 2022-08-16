import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Alert,
  Appearance,
} from 'react-native'
import Header from '../Components/Header'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useRoute } from '@react-navigation/native'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { setUserExercises } from '../redux/states/workoutSlice'

export default function UserExercises() {
  const dispatch = useDispatch()
  const userVal = useAppSelector((state) => state.user.userVal)
  const UserExercises = useAppSelector((state) => state.workout.UserExercises)
  const workoutName = useAppSelector((state) => state.workout.workoutName)
  const window = Dimensions.get('window')
  const [reps, setReps] = React.useState<string>(UserExercises[0].sets[0].reps)
  const [weight, setWeight] = React.useState<string>(UserExercises[0].sets[0].weight)
  const [isSetAdded, setIsSetAdded] = React.useState(false)
  const [selectedSet, setSelectedSet] = React.useState(0)
  const [setNumber, setSetNumber] = React.useState(1)
  const [set_Id, setSet_Id] = React.useState('')
  const setTitleRef = React.useRef<any>(null)
  const repsInputRef = React.useRef<any>(null)

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
              weight
              _id
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
      getUserWorkout.map(({ exercises }: any) => dispatch(setUserExercises(exercises)))
    }
    getUserExercises()
    return () => {
      getUserExercises()
    }
  }, [isSetAdded])

  const addSet = async (setName: string, setLength: number) => {
    setWeight('0')
    setReps('0')
    const ADD_SET_QUERY = `mutation AddSetsReps($userName: String, $workoutName: String, $exerciseName: String, $setsReps: [setRepsWeightinput]) {
      addSetsReps(userName: $userName, workoutName: $workoutName, exerciseName: $exerciseName, setsReps: $setsReps) {
        userName
        workoutName
        exercises {
          sets {
            reps
            set
            weight
            _id
          }
        }
      }
    }`

    const res = await axios.post(BASE_URL, {
      query: ADD_SET_QUERY,
      variables: {
        setsReps: [
          {
            reps: +reps,
            weight: +weight,
          },
        ],
        userName: userVal,
        workoutName: 'Workout_NEW',
        exerciseName: setName,
      },
    })
    if (res.status !== 200) throw new Error('Something went wrong')
    const data = await res.data.data.addSetsReps.exercises[0]
    setSet_Id(data.sets[data.sets.length - 1]._id)
    setSelectedSet(setLength + 1)
    await setTitleRef.current.scrollToIndex({
      animated: true,
      index: setLength - 1,
      viewPosition: -1,
    })
    setIsSetAdded(!isSetAdded)
    repsInputRef.current.focus()
  }

  const updateSet = async (reps: string, weight: string) => {
    try {
      const EXERCISE_UPDATE_QUERY = `mutation updateSet($workoutName: String!, $userName: String!, $updateSetId: String!, $reps: Int, $weight: Int) {
        updateSet(workoutName: $workoutName, userName: $userName, id: $updateSetId, reps: $reps, weight: $weight) {
          exercises {
            sets {
              reps
            weight
          }
        }
      }
    }`
      const res = await axios.post(BASE_URL, {
        query: EXERCISE_UPDATE_QUERY,
        variables: {
          workoutName: 'Workout_NEW',
          userName: userVal,
          updateSetId: set_Id,
          weight: +weight,
          reps: +reps,
        },
      })
      if (res.status !== 200) return Alert.alert('❌ Uhh!', 'ℹ️ Something Went Wrong')
      // console.log(res.data.data)
      setIsSetAdded(!isSetAdded)
    } catch (err) {
      console.log(err)
    }
  }
  const deleteSet = async () => {
    try {
      const EXERCISE_DELETE_QUERY = `mutation DeleteSet($workoutName: String!, $userName: String!, $deleteSetId: String!) {
        deleteSet(workoutName: $workoutName, userName: $userName, id: $deleteSetId) {
          exercises {
            sets {
              set
              reps
              weight
              _id
            }
          }
        }
      }`
      if (selectedSet === 1) return Alert.alert('❌ Hold on', "💪 You can't delete Set 1")
      const res = await axios.post(BASE_URL, {
        query: EXERCISE_DELETE_QUERY,
        variables: {
          workoutName: 'Workout_NEW',
          userName: userVal,
          deleteSetId: set_Id,
        },
      })
      if (res.status !== 200) return
      // console.log(res.data.data)
      setIsSetAdded(!isSetAdded)
    } catch (err) {
      console.log(err)
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
            renderItem={({ item: set, index: indx }: any) => {
              return (
                <>
                  <View
                    style={{
                      marginHorizontal: window.width - window.width / 1.05,
                      padding: 8,
                      borderRadius: 8,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedSet(1)
                        setSetNumber(indx)
                      }}
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
                    {setNumber === indx && (
                      <View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                          <FlatList
                            ref={setTitleRef}
                            data={set.sets}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => {
                              return (
                                <>
                                  <Pressable
                                    style={{ marginVertical: 20 }}
                                    onPressIn={() => {
                                      setReps(item.reps)
                                      setWeight(item.weight)
                                      setSelectedSet(index + 1)
                                      setSet_Id(item._id)
                                    }}
                                    onLongPress={() => deleteSet()}>
                                    <Text
                                      style={[
                                        styles.setTitle,
                                        {
                                          backgroundColor: selectedSet === index + 1 ? '#92A3FD' : '#fff',
                                          color: selectedSet === index + 1 ? '#fff' : '#555',
                                          borderTopLeftRadius: index === 0 ? 8 : 0,
                                          borderBottomLeftRadius: index === 0 ? 8 : 0,
                                          borderTopRightRadius: index === set.sets.length - 1 ? 8 : 0,
                                          borderBottomRightRadius: index === set.sets.length - 1 ? 8 : 0,
                                        },
                                      ]}>
                                      Set {index + 1}
                                    </Text>
                                  </Pressable>
                                </>
                              )
                            }}
                            keyExtractor={(_, idx) => idx.toString()}
                          />
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'center',
                            }}>
                            <View style={{ alignItems: 'center' }}>
                              <Text style={styles.setRepsWeightTitle}>Reps</Text>
                              <TextInput
                                ref={repsInputRef}
                                textAlign='center'
                                keyboardType='numeric'
                                placeholder={reps?.toString()}
                                onEndEditing={async (e) => {
                                  e.preventDefault()
                                  const reps = e.nativeEvent.text
                                  setReps(reps)
                                  await updateSet(reps, weight)
                                }}
                                placeholderTextColor='#555'
                                style={styles.setRepsInput}
                              />
                            </View>
                            <View style={{ alignItems: 'center' }}>
                              <Text style={styles.setRepsWeightTitle}>Weight</Text>
                              <TextInput
                                textAlign='center'
                                keyboardType='numeric'
                                placeholder={weight?.toString()}
                                onEndEditing={async (e) => {
                                  e.preventDefault()
                                  const weight = e.nativeEvent.text
                                  setWeight(weight)
                                  await updateSet(reps, weight)
                                }}
                                placeholderTextColor='#555'
                                style={styles.setRepsInput}
                              />
                            </View>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={async () => {
                            await addSet(set.name, set.sets.length)
                          }}
                          style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#DDDADA99',
                            borderRadius: 8,
                            height: 40,
                            marginVertical: 20,
                          }}>
                          <Text style={[styles.titleTxt, { color: '#555' }]}>Add Set</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </>
              )
            }}
            numColumns={1}
            keyExtractor={(_, idx) => idx.toString()}
          />
        </View>
        {/* <Modal transparent animationType='slide'>
          <View style={{ top: '60%', backgroundColor: '#fff', height: '100%', alignItems: 'center' }}>
            <Text>{reps}</Text>
          </View>
        </Modal> */}
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
    fontFamily: 'Poppins',
    color: '#888',
    fontSize: 14,
  },
  setTitle: {
    backgroundColor: '#fff',
    color: '#555',
    width: 72,
    height: 58,
    textAlign: 'center',
    textAlignVertical: 'center',
    // borderRightWidth: 0.5,
    // borderColor: '#ccc',
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
    fontSize: 14,
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 6,
    margin: 12,
    color: '#555',
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

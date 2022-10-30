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
  ActivityIndicator,
  Linking,
} from 'react-native'
import Header from '../Components/Header'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { FlatList, TextInput } from 'react-native-gesture-handler'
import { setUserExercises, setSelectedList, setExerciseId } from '../redux/states/workoutSlice'
import { ADD_SET_QUERY } from '../Queries/ADD_SET_QUERY'
import { EXERCISE_UPDATE_QUERY } from '../Queries/EXERCISE_UPDATE_QUERY'
import { GET_EXERCISE_QUERY } from '../Queries/GET_EXERCISE_QUERY'
import { EXERCISE_DELETE_QUERY } from '../Queries/EXERCISE_DELETE_QUERY'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import BackgroundJob from 'react-native-background-actions'
// import { BASE_URI } from '@env'
import MainButton from '../Components/MainButton'
import { ListTitle } from '../Components/ListTitle'
import { BASE_URI } from '../URI'

export default function UserExercises() {
  const dispatch = useDispatch()
  const userVal = useAppSelector((state) => state.user.userVal)
  const UserExercises = useAppSelector((state) => state.workout.UserExercises)
  const workoutName = useAppSelector((state) => state.workout.workoutName)
  const selectedList = useAppSelector((state) => state.workout.selectedList)
  const exerciseId = useAppSelector((state) => state.workout.exerciseId)
  const window = Dimensions.get('window')
  const [reps, setReps] = React.useState<string>('')
  const [weight, setWeight] = React.useState<string>('')
  const [isSetAdded, setIsSetAdded] = React.useState(false)
  const [startExercise, setStartExercise] = React.useState(false)
  const [setItemId, setSetItemId] = React.useState('')
  const repsInputRef = React.useRef<any>(null)
  const [timer, setTimer] = React.useState(0)
  const [listLoader, setListLoader] = React.useState(true)

  const workoutTimer = async (taskData: any) => {
    const { delay } = taskData
    for (let i = 0; BackgroundJob.isRunning(); i++) {
      setTimer(i)
      await BackgroundJob.updateNotification({ taskDesc: '' + i })
      await new Promise<void>((resolve) => setTimeout(() => resolve(), delay))
    }
  }

  React.useEffect(() => {
    let functionLoad = true
    const getUserExercises = async () => {
      const res = await axios.post(BASE_URI, {
        query: GET_EXERCISE_QUERY,
        variables: {
          userName: userVal,
          workoutName: workoutName,
        },
      })
      const { getUserWorkout } = res.data.data
      getUserWorkout.map(({ exercises }: any) => dispatch(setUserExercises(exercises)))
    }
    if (functionLoad) {
      getUserExercises().then(() => {
        setListLoader(false)
      })
    }
    return () => {
      getUserExercises()
      functionLoad = false
    }
  }, [isSetAdded])

  const addSet = async (setName: string, setLength: number) => {
    setWeight('0')
    setReps('0')
    const res = await axios.post(BASE_URI, {
      query: ADD_SET_QUERY,
      variables: {
        setsReps: [
          {
            reps: +reps,
            weight: +weight,
          },
        ],
        userName: userVal,
        workoutName: workoutName,
        exerciseName: setName,
      },
    })
    if (res.status !== 200) throw new Error('Something went wrong')
    setIsSetAdded(!isSetAdded)
  }

  const updateSet = async (reps: string, weight: string) => {
    try {
      const res = await axios.post(BASE_URI, {
        query: EXERCISE_UPDATE_QUERY,
        variables: {
          workoutName: workoutName,
          userName: userVal,
          updateSetId: setItemId,
          weight: +weight,
          reps: +reps,
        },
      })
      if (res.status !== 200) return Alert.alert('❌ Uhh!', 'ℹ️ Something Went Wrong')
      setIsSetAdded(!isSetAdded)
    } catch (err) {
      console.log(err)
    }
  }
  const deleteSet = async (exerSetId: string) => {
    try {
      const res = await axios.post(BASE_URI, {
        query: EXERCISE_DELETE_QUERY,
        variables: {
          workoutName: workoutName,
          userName: userVal,
          deleteSetId: exerSetId,
        },
      })
      if (res.status !== 200) return
      setIsSetAdded(!isSetAdded)
    } catch (err) {
      console.log(err)
    }
  }
  interface exerListTypes {
    item: object
    _id: string
  }
  const selectedExerList = (item: exerListTypes) => {
    dispatch(setSelectedList(item))
  }
  const options = {
    taskName: 'workoutTimer',
    taskTitle: 'LiveFit Timer',
    taskDesc: 'Workout time',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#fff',
    linkingURI: 'livefit',
    parameters: {
      delay: 1000,
    },
    actions: '["Exit"]',
  }
  let playing = BackgroundJob.isRunning()
  const startWorkout = async () => {
    setStartExercise(!startExercise)
    playing = !playing
    if (playing) {
      try {
        await BackgroundJob.start(workoutTimer, options)
        console.log('Successful start!')
      } catch (e) {
        console.log('Error', e)
      }
    } else {
      console.log('Stop background service')
      await BackgroundJob.stop()
    }
  }
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Header timer={timer} />
        <Text style={[styles.txt, { marginHorizontal: 20 }]}>Exercises</Text>
        <View
          style={{
            marginTop: 14,
            backgroundColor: 'rgba(100,100,100,0.05)',
            marginHorizontal: 20,
            borderRadius: 12,
            flex: 1,
          }}>
          {!listLoader ? (
            <FlatList
              scrollEnabled
              showsVerticalScrollIndicator={false}
              data={UserExercises}
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
                          if (exerciseId === set.id) return dispatch(setExerciseId(''))
                          return dispatch(setExerciseId(set.id))
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
                          <View style={{ position: 'absolute' }}>
                            <AnimatedCircularProgress
                              size={65}
                              width={2}
                              fill={100}
                              tintColor='#92A3FD33'
                              backgroundColor='#eee'
                            />
                          </View>
                          <Text style={[styles.titleTxt, { marginLeft: 15, color: '#555' }]}>
                            {set.name.split(' ')[0]} {set.name.split(' ')[1]} {set.name.split(' ')[2]}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      {exerciseId === set.id && (
                        <View>
                          <FlatList
                            scrollEnabled
                            ListHeaderComponent={() => {
                              return (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    marginVertical: 20,
                                  }}>
                                  <ListTitle width="default" title='SET' />
                                  <ListTitle width="default"title='REPS' />
                                  <ListTitle width="default" title='WEIGHT' />
                                  <ListTitle width="default" title='STATUS' />
                                </View>
                              )
                            }}
                            data={set.sets}
                            renderItem={({ item, index }) => {
                              return (
                                <>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-around',
                                      alignItems: 'center',
                                      backgroundColor: selectedList.find(
                                        ({ _id }: { _id: string }) => _id === item._id
                                      )
                                        ? '#90EEBB'
                                        : index % 2 === 0
                                        ? '#00000000'
                                        : '#92A3FD22',
                                      marginVertical: 5,
                                      borderRadius: 8,
                                    }}>
                                    <TouchableOpacity
                                      style={{ alignItems: 'center' }}
                                      // onPress={() => {
                                      //   console.log(
                                      //     selectedList.some((a: { _id: string }) => a._id === item._id)
                                      //   )
                                      //   console.log(set.sets.length)
                                      // }}
                                      onLongPress={() => deleteSet(item._id)}>
                                      <TextInput
                                        textAlign='center'
                                        keyboardType='numeric'
                                        placeholder={(index + 1)?.toString()}
                                        editable={false}
                                        placeholderTextColor='#777'
                                        style={[styles.setRepsInput, { fontSize: 16 }]}
                                      />
                                    </TouchableOpacity>
                                    <View style={{ alignItems: 'center' }}>
                                      <TextInput
                                        ref={repsInputRef}
                                        keyboardType='numeric'
                                        placeholder={item.reps?.toString()}
                                        onFocus={() => setSetItemId(item._id)}
                                        onEndEditing={async (ev) => {
                                          setSetItemId(item._id)
                                          setReps(ev.nativeEvent.text)
                                          await updateSet(ev.nativeEvent.text, item.weight)
                                        }}
                                        placeholderTextColor='#777'
                                        style={[styles.setRepsInput, { marginLeft: 20 }]}
                                      />
                                    </View>
                                    <View style={{ alignItems: 'center' }}>
                                      <TextInput
                                        keyboardType='numeric'
                                        placeholder={item.weight?.toString()}
                                        onFocus={() => setSetItemId(item._id)}
                                        onEndEditing={async (ev) => {
                                          setReps(ev.nativeEvent.text)
                                          await updateSet(item.reps, ev.nativeEvent.text)
                                        }}
                                        placeholderTextColor='#777'
                                        style={styles.setRepsInput}
                                      />
                                    </View>
                                    <Pressable
                                      style={{ alignItems: 'center' }}
                                      onPress={() => selectedExerList(item)}>
                                      <View style={{ width: 36, height: 25 }}>
                                        <Image
                                          source={
                                            selectedList.find(({ _id }: { _id: string }) => _id === item._id)
                                              ? require('../assets/icons/done.png')
                                              : require('../assets/icons/not_done.png')
                                          }
                                          style={{
                                            width: 22,
                                            height: 22,
                                            resizeMode: 'contain',
                                            opacity: 0.7,
                                          }}
                                        />
                                      </View>
                                    </Pressable>
                                  </View>
                                </>
                              )
                            }}
                            keyExtractor={(_, idx) => idx.toString()}
                          />
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
              keyExtractor={(item, idx) => idx.toString()}
            />
          ) : (
            <View style={{ flex: 1, marginTop: '50%' }}>
              <ActivityIndicator color={'#92A3FD'} size={'large'} />
            </View>
          )}
        </View>
        <MainButton
          horizontalMargin='default'
          title={startExercise ? 'Finish Workout' : 'Start Workout'}
          onPress={startWorkout}
        />
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
  titleTxt: {
    fontFamily: 'Poppins_Bold',
    textTransform: 'capitalize',
    color: '#777',
    fontSize: 14,
  },
  setRepsInput: {
    fontFamily: 'Poppins_Bold',
    fontSize: 16,
    width: 58,
    height: 38,
    color: '#777',
  },
})

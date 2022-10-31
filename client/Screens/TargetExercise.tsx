import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native'
import Header from '../Components/Header'
import axios from 'axios'
import { useAppSelector } from '../redux/hooks'
import { setSpecificExercises } from '../redux/states/workoutSlice'
import { useDispatch } from 'react-redux'
import { SpecificExerciseView } from '../Components/popups/SpecificExerciseView'
import { CREATE_WORKOUT_QUERY } from '../Queries/CREATE_WORKOUT_QUERY'
import { GET_TARGET_EXERCISE_QUERY } from '../Queries/GET_TARGET_EXERCISE_QUERY'
import InfoChangePopup from '../Components/popups/InfoChangePopup'
import { useNavigation } from '@react-navigation/native'
import { BASE_URI } from '../URI'
// import { BASE_URI } from '@env'

export default function TargetExercise() {
  const dispatch = useDispatch()
  const exerciseTarget = useAppSelector((state) => state.workout.exerciseTarget)
  const workoutNameUserInput = useAppSelector((state) => state.workout.workoutNameUserInput)
  const [specificWorkout, setSpecificWorkout] = React.useState<boolean>(false)
  const [exerciseItem, setExerciseItem] = React.useState<object>({})
  const [searchVal, setSearchVal] = React.useState('')
  const window = Dimensions.get('window')
  const userVal = useAppSelector((state) => state.user.userVal)
  const specificExercises = useAppSelector((state) => state.workout.specificExercises)
  const [popup, setPopup] = React.useState(false)
  const [listLoader, setListLoader] = React.useState(true)

  const navigation = useNavigation()
  React.useEffect(() => {
    let isMounted = true
    const getExerciseList = async () => {
      const fetchData = await axios.post(BASE_URI, {
        query: GET_TARGET_EXERCISE_QUERY,
        variables: {
          target: exerciseTarget,
        },
      })
      const { getExercise } = fetchData.data.data
      return getExercise
    }
    if (isMounted) {
      getExerciseList()
        .then((response) => {
          dispatch(setSpecificExercises(response))
          setListLoader(false)
        })
        .catch((err) => console.log(err))
    }
    return () => {
      getExerciseList()
      isMounted = false
    }
  }, [])

  const searchExercise = (val: string) => {
    setSearchVal(val)
  }

  const specificView = (item: any) => {
    setExerciseItem(item)
    setSpecificWorkout(true)
  }

  const [inputBorderColor, setInputBorderColor] = React.useState('#ccc')
  const [exerciseArray, setExerciseArray] = React.useState<any>([])

  const selectExercises = (item: any) => {
    if (exerciseArray.includes(item)) {
      setExerciseArray(exerciseArray.filter(({ name }: any) => name !== item.name))
    } else {
      setExerciseArray([...exerciseArray, item])
    }
  }
  const selected = (item: object) => exerciseArray.includes(item)

  const CreateUpdateWorkout = async () => {
    try {
      if (workoutNameUserInput === '') {
        return Alert.alert('🥴 Hold on!', 'Type a workout name first')
      }
      setPopup(true)
      const res = await axios.post(BASE_URI, {
        query: CREATE_WORKOUT_QUERY,
        variables: {
          exercises: exerciseArray,
          userName: userVal,
          workoutName: workoutNameUserInput,
        },
      })
      // console.log(res.data)
      navigation.navigate('Workouts')
    } catch ({ response }: any) {
      console.log(response)
    }
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Header CreateUpdateWorkout={CreateUpdateWorkout} setPopup={setPopup} />
        {popup ? (
          <>
            <InfoChangePopup
              CreateUpdateWorkout={CreateUpdateWorkout}
              popup={popup}
              setPopup={setPopup}
            />
          </>
        ) : null}
        <View style={[styles.input, { borderColor: inputBorderColor, borderWidth: 1 }]}>
          <TextInput
            onFocus={() => setInputBorderColor('#92A3FD')}
            onBlur={() => setInputBorderColor('#ccc')}
            value={searchVal}
            onChangeText={(val) => searchExercise(val)}
            placeholder='Search Exercises'
            style={styles.inputTextField}
          />
        </View>
        <View
          style={{
            marginTop: 14,
            backgroundColor: 'rgba(100,100,100,0.05)',
            marginHorizontal: 20,
            borderRadius: 12,
            flex: 1,
            // marginBottom: 50,
          }}>
          {!listLoader ? (
            <FlatList
              data={!listLoader && specificExercises}
              removeClippedSubviews={true}
              maxToRenderPerBatch={10}
              renderItem={({ item, index }: any) => {
                return (
                  <>
                    {item.name.toLowerCase().includes(searchVal.toLowerCase()) ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          backgroundColor: selected(item) ? '#92A3FD33' : '#00000000',
                          marginTop: index !== 0 ? 2 : 0,
                          borderTopLeftRadius: index === 0 ? 12 : 0,
                          borderTopRightRadius: index === 0 ? 12 : 0,
                        }}>
                        <View
                          style={{
                            marginHorizontal: window.width - window.width / 1.05,
                            padding: 8,
                            borderRadius: 8,
                          }}>
                          <TouchableOpacity
                            onLongPress={() => {
                              setExerciseItem(item)
                              setSpecificWorkout(!specificWorkout)
                            }}
                            onPressIn={() => selectExercises(item)}
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <View>
                              {/* {selected(item) && (
                              <View
                                style={{
                                  backgroundColor: '#92A3FD',
                                  marginLeft: -20,
                                  marginRight: 16,
                                  width: 4,
                                  height: '100%',
                                  position: 'absolute',
                                  borderRadius: 20,
                                }}></View>
                            )} */}
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  marginVertical: 3,
                                }}>
                                <View
                                  style={{
                                    width: 65,
                                    height: 65,
                                    borderRadius: 100,
                                    overflow: 'hidden',
                                    borderWidth: 1,
                                    borderColor: selected(item) ? '#92A3FD' : '#fff',
                                  }}>
                                  <Image
                                    source={{ uri: item.gifUrl }}
                                    style={{
                                      width: 65,
                                      height: 65,
                                      borderRadius: 100,
                                    }}
                                  />
                                </View>
                                <Text style={[styles.titleTxt, { marginLeft: 15, color: '#555' }]}>
                                  {item.name.split(' ')[0]} {item.name.split(' ')[1]}{' '}
                                  {item.name.split(' ')[2]}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          activeOpacity={0.6}
                          onPress={() => {
                            setExerciseItem(item)
                            setSpecificWorkout(!specificWorkout)
                          }}>
                          <Image
                            source={require('../assets/icons/workout_btn.png')}
                            style={{ resizeMode: 'contain', width: 30, marginRight: 18 }}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <></>
                    )}
                  </>
                )
              }}
              numColumns={1}
              keyExtractor={(_, idx) => idx.toString()}
            />
          ) : (
            <View style={{ flex: 1, marginTop: '50%' }}>
              <ActivityIndicator color={'#92A3FD'} size={'large'} />
            </View>
          )}
        </View>
      </View>
      {/* <TouchableOpacity style={{ position: 'relative' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            height: 60,
            marginHorizontal: 20,
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Image
              source={require('../assets/icons/add.png')}
              style={{ width: 30, height: 30, resizeMode: 'contain' }}
            />
            <Text style={styles.addExerciseTitle}>Create a workout</Text>
          </View>
        </View>
      </TouchableOpacity> */}
      <SpecificExerciseView
        specificWorkout={specificWorkout}
        setSpecificWorkout={setSpecificWorkout}
        exerciseItem={exerciseItem}
      />
      <View style={{ backgroundColor: '#FFF' }}>
        <TouchableOpacity
          style={styles.saveWorkoutBtn}
          // onPress={() => createWorkoutPopup()}
        >
          <Text style={styles.saveWorkoutBtnText}>Add exercises</Text>
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
  addExerciseTitle: {
    marginHorizontal: 10,
    fontFamily: 'Poppins_Bold',
    color: 'rgb(80,80,80)',
    fontSize: 14,
  },
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
  WorkoutNameinput: {
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(100,100,100,0.05)',
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    marginHorizontal: 16,
    borderColor: '#ccc',
    width: 180,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  input: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F8F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    marginHorizontal: 20,
  },
  inputTextField: {
    width: 250,
    fontSize: 14,
    marginHorizontal: 10,
  },
})

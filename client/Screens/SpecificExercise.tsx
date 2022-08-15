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
} from 'react-native'
import Header from '../Components/Header'
import axios from 'axios'
import { useAppSelector } from '../redux/hooks'
import { setSpecificExercises } from '../redux/states/workoutSlice'
import { useDispatch } from 'react-redux'
import { SpecificExerciseView } from '../Components/popups/SpecificExerciseView'
import { Btn } from '../Components/Button'

export default function SpecificExercise() {
  const dispatch = useDispatch()
  const exerciseTarget = useAppSelector((state) => state.workout.exerciseTarget)
  const [specificWorkout, setSpecificWorkout] = React.useState<boolean>(false)
  const [exerciseItem, setExerciseItem] = React.useState<object>({})
  const [searchVal, setSearchVal] = React.useState('')
  const window = Dimensions.get('window')
  const userVal = useAppSelector((state) => state.user.userVal)
  const specificExercises = useAppSelector((state) => state.workout.specificExercises)

  const BASE_URL = 'https://livefitv2.herokuapp.com/graphql'
  const GET_EXERCISE_QUERY = `mutation Mutation($target: String!) {
    getExercise(target: $target) {
      gifUrl
      id
      name
      target
      equipment
    }
  }`

  React.useEffect(() => {
    let isMounted = true
    const getExerciseList = async () => {
      const fetchData = await axios.post(BASE_URL, {
        query: GET_EXERCISE_QUERY,
        variables: {
          target: exerciseTarget,
        },
      })
      const { getExercise } = fetchData.data.data
      return getExercise
    }
    if (isMounted) {
      getExerciseList()
        .then((response) => dispatch(setSpecificExercises(response)))
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
      const CREATE_WORKOUT_QUERY = `mutation CreateUpdateWorkout($userName: String!, $workoutName: String!, $exercises: [WorkoutInput]) {
        createUpdateWorkout(userName: $userName, workoutName: $workoutName, exercises: $exercises) {
          workoutName
          userName
          exercises {
            equipment
            gifUrl
            id
            name
            target
          }
        }
      }`
      const res = await axios.post(BASE_URL, {
        query: CREATE_WORKOUT_QUERY,
        variables: {
          exercises: exerciseArray,
          userName: userVal,
          workoutName: 'Workout_NEW',
        },
      })
      console.log(res.data)
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
        <Header />
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
          }}>
          <FlatList
            data={specificExercises}
            removeClippedSubviews={true}
            maxToRenderPerBatch={10}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    borderColor: 'rgba(100,100,100,0.1)',
                    borderBottomWidth: 1,
                  }}></View>
              )
            }}
            renderItem={({ item }: any) => {
              return (
                <>
                  {item.name.toLowerCase().includes(searchVal.toLowerCase()) ? (
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View
                        style={{
                          marginHorizontal: window.width - window.width / 1.05,
                          padding: 8,
                          borderRadius: 8,
                        }}>
                        <Pressable
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
                            {selected(item) && (
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
                            )}
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
                              <Text
                                style={[
                                  styles.titleTxt,
                                  { marginLeft: 15, color: selected(item) ? '#92A3FD' : '#555' },
                                ]}>
                                {item.name.split(' ')[0]} {item.name.split(' ')[1]} {item.name.split(' ')[2]}
                              </Text>
                            </View>
                          </View>
                        </Pressable>
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
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.9} style={{ position: 'absolute', top: '92%', left: '5%' }}>
        <Btn title='Add exercise' loading={false} />
      </TouchableOpacity>
      <SpecificExerciseView
        specificWorkout={specificWorkout}
        setSpecificWorkout={setSpecificWorkout}
        exerciseItem={exerciseItem}
      />
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
  input: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F8F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    marginHorizontal: 20,
    // borderWidth: 1,
  },
  inputTextField: {
    width: 250,
    fontSize: 14,
    marginHorizontal: 10,
  },
})

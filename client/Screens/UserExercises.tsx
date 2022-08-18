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
import { ADD_SET_QUERY } from '../Queries/ADD_SET_QUERY'
import { EXERCISE_UPDATE_QUERY } from '../Queries/EXERCISE_UPDATE_QUERY'
import { GET_EXERCISE_QUERY } from '../Queries/GET_EXERCISE_QUERY'
import { EXERCISE_DELETE_QUERY } from '../Queries/EXERCISE_DELETE_QUERY'

export default function UserExercises() {
  const dispatch = useDispatch()
  const userVal = useAppSelector((state) => state.user.userVal)
  const UserExercises = useAppSelector((state) => state.workout.UserExercises)
  const workoutName = useAppSelector((state) => state.workout.workoutName)
  const window = Dimensions.get('window')
  const [reps, setReps] = React.useState<string>('')
  const [weight, setWeight] = React.useState<string>('')
  const [isSetAdded, setIsSetAdded] = React.useState(false)
  const [selectedList, setSelectedList] = React.useState([])
  const [exerSetId, setExerSetId] = React.useState('')
  const repsInputRef = React.useRef<any>(null)

  const BASE_URL = 'https://livefitv2.herokuapp.com/graphql'
  React.useEffect(() => {
    const getUserExercises = async () => {
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
    setIsSetAdded(!isSetAdded)
    repsInputRef.current.focus()
  }

  const updateSet = async (reps: string, weight: string) => {
    try {
      console.log('REPS', reps, 'WEIGHT', weight)
      const res = await axios.post(BASE_URL, {
        query: EXERCISE_UPDATE_QUERY,
        variables: {
          workoutName: 'Workout_NEW',
          userName: userVal,
          updateSetId: exerSetId,
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
      const res = await axios.post(BASE_URL, {
        query: EXERCISE_DELETE_QUERY,
        variables: {
          workoutName: 'Workout_NEW',
          userName: userVal,
          deleteSetId: exerSetId,
        },
      })
      if (res.status !== 200) return
      // console.log(res.data.data)
      setIsSetAdded(!isSetAdded)
    } catch (err) {
      console.log(err)
    }
  }
  const selectedExerList = (item: any) => {
    if (selectedList.includes(item)) {
      setSelectedList(selectedList.filter(({ _id }) => _id !== item._id))
    } else {
      setSelectedList([...selectedList, item])
    }
  }
  const SetRepsListTitle = ({ title }: { title: string }) => {
    return (
      <TextInput
        textAlign='center'
        placeholder={title}
        editable={false}
        placeholderTextColor='#130F2677'
        style={[styles.setRepsInput, { width: 60, height: 50, textAlign: 'center' }]}
      />
    )
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
            borderRadius: 12,
            flex: 1,
          }}>
          <FlatList
            scrollEnabled
            data={UserExercises}
            // ItemSeparatorComponent={() => {
            //   return (
            //     <View
            //       style={{
            //         borderColor: 'rgba(100,100,100,0.2)',
            //         borderBottomWidth: 1,
            //         alignItems: 'center',
            //         marginHorizontal: 20,
            //       }}></View>
            //   )
            // }}
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
                    <View>
                      <View style={{ marginTop: 20, flex: 1 }}>
                        <FlatList
                          scrollEnabled
                          ListHeaderComponent={() => {
                            return (
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-around',
                                }}>
                                <SetRepsListTitle title='SET' />
                                <SetRepsListTitle title='REPS' />
                                <SetRepsListTitle title='WEIGHT' />
                                <SetRepsListTitle title='STATUS' />
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
                                    backgroundColor: index % 2 === 0 ? '#00000000' : '#92A3FD22',
                                    marginVertical: 5,
                                  }}>
                                  <View style={{ alignItems: 'center' }}>
                                    <TextInput
                                      ref={repsInputRef}
                                      textAlign='center'
                                      keyboardType='numeric'
                                      placeholder={(index + 1)?.toString()}
                                      editable={false}
                                      placeholderTextColor='#777'
                                      style={styles.setRepsInput}
                                    />
                                  </View>
                                  <View style={{ alignItems: 'center' }}>
                                    <TextInput
                                      ref={repsInputRef}
                                      textAlign='center'
                                      keyboardType='numeric'
                                      placeholder={item.reps?.toString()}
                                      onFocus={() => setExerSetId(item._id)}
                                      onEndEditing={async (ev) => {
                                        setExerSetId(item._id)
                                        setReps(ev.nativeEvent.text)
                                        await updateSet(ev.nativeEvent.text, weight)
                                      }}
                                      placeholderTextColor='#777'
                                      style={styles.setRepsInput}
                                    />
                                  </View>
                                  <View style={{ alignItems: 'center' }}>
                                    <TextInput
                                      textAlign='center'
                                      keyboardType='numeric'
                                      placeholder={item.weight?.toString()}
                                      onFocus={() => setExerSetId(item._id)}
                                      onEndEditing={async (ev) => {
                                        setReps(ev.nativeEvent.text)
                                        await updateSet(reps, ev.nativeEvent.text)
                                      }}
                                      placeholderTextColor='#777'
                                      style={styles.setRepsInput}
                                    />
                                  </View>
                                  <TouchableOpacity
                                    style={{ alignItems: 'center' }}
                                    onPress={() => selectedExerList(item)}>
                                    <View style={{ width: 36, height: 25 }}>
                                      <Image
                                        source={
                                          selectedList.includes(item)
                                            ? require('../assets/icons/done.png')
                                            : require('../assets/icons/not_done.png')
                                        }
                                        style={{ width: 22, height: 22, resizeMode: 'contain', opacity: 0.7 }}
                                      />
                                    </View>
                                  </TouchableOpacity>
                                </View>
                              </>
                            )
                          }}
                          keyExtractor={(_, idx) => idx.toString()}
                        />
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
    fontSize: 18,
  },
  titleTxt: {
    fontFamily: 'Poppins_Bold',
    textTransform: 'capitalize',
    color: '#777',
    fontSize: 14,
  },
  setRepsInput: {
    fontFamily: 'Poppins_Bold',
    fontSize: 14,
    // width: 58,
    // height: 38,
    // textAlign: 'center',
    // borderRadius: 6,
    // marginVertical: 2,
    paddingVertical: 5,
    // color: '#777',
  },
})

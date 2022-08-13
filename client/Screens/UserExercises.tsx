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
  }, [])

  // console.log(UserExercises)

  let number = 0
  const [setRepNumber, setSetRepNumber] = React.useState([number])

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
            renderItem={({ item }: any) => {
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
                            source={{ uri: item.gifUrl }}
                            style={{
                              width: 65,
                              height: 65,
                              borderWidth: 0,
                              borderRadius: 100,
                            }}
                          />
                        </View>
                        <Text style={[styles.titleTxt, { marginLeft: 15, color: '#555' }]}>
                          {item.name.split(' ')[0]} {item.name.split(' ')[1]} {item.name.split(' ')[2]}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <FlatList
                      data={setRepNumber}
                      renderItem={() => {
                        return (
                          <View>
                            <View
                              style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'center' }}>
                              <TextInput
                                placeholder='Set'
                                keyboardType='numeric'
                                style={styles.SetRepInput}
                              />
                              <Text style={{ marginVertical: 17, marginHorizontal: 5, color: '#555' }}>
                                X
                              </Text>
                              <TextInput
                                placeholder='Reps'
                                keyboardType='numeric'
                                style={styles.SetRepInput}
                              />
                              <TextInput
                                placeholder='Weight'
                                keyboardType='numeric'
                                style={styles.SetRepInput}
                              />
                            </View>
                          </View>
                        )
                      }}
                      keyExtractor={(_, idx) => idx.toString()}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setSetRepNumber([...setRepNumber, number + 1])
                      }}
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

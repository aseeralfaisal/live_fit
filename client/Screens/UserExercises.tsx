import * as React from 'react'
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native'
import Header from '../Components/Header'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { useRoute } from '@react-navigation/native'
import { FlatList } from 'react-native-gesture-handler'

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
      const GET_EXERCISE_QUERY = `mutation Mutation($userName: String!, $workoutName: String!) {
        getUserWorkout(userName: $userName, workoutName: $workoutName) {
          workoutName
          userName
          exercises {
           name 
           gifUrl
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
      getUserWorkout.map(({ exercises }: any) => setUserExercises(exercises))
    }
    getUserExercises()
    return () => {
      getUserExercises()
    }
  }, [])

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
            renderItem={({ item }: any) => {
              return (
                <>
                  <View
                    style={{
                      marginHorizontal: window.width - window.width / 1.05,
                      borderColor: 'rgba(100,100,100,0.2)',
                      padding: 8,
                      borderBottomWidth: 0,
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

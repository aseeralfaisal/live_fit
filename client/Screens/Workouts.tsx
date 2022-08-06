import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  FlatList,
  Animated,
  TextInput,
  Button,
  ImageBackground,
} from 'react-native'
import Header from '../Components/Header'
import { useColorScheme } from 'react-native-appearance'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { exerciseDATA } from '../assets/ExerciseData'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

export default function Workouts() {
  let colorScheme = useColorScheme()
  const [start, setStart] = React.useState(false)
  const [watch, setWatch] = React.useState(0)
  const [listView, setListView] = React.useState(false)
  const [specificWorkout, setSpecificWorkout] = React.useState(false)
  const [exer, setExer] = React.useState(0)
  const [exerciseItem, setExerciseItem] = React.useState<any>(undefined)
  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const [playBtn, setPlayBtn] = React.useState('Start')
  const [countStartBtnClick, setCountStartBtnClick] = React.useState(0)
  const [searchVal, setSearchVal] = React.useState('')
  const [workouts, setWorkouts] = React.useState([])

  const window = Dimensions.get('window')

  React.useEffect(() => {
    const BASE_URL = 'https://livefitv2.herokuapp.com/graphql'
    const GET_EXERCISE_QUERY = `mutation Mutation($target: String!) {
      getExercise(target: $target) {
        gifUrl
        name
        target
        equipment
      }
    }`
    ;(async () => {
      const fetchData = await axios.post(BASE_URL, {
        query: GET_EXERCISE_QUERY,
        variables: { target: 'back' },
      })
      const { getExercise } = fetchData.data.data
      setWorkouts(getExercise)
    })()
  }, [])

  const searchExercise = (val: string) => {
    setSearchVal(val)
  }

  const specificView = (item: any) => {
    setExerciseItem(item)
    setSpecificWorkout(true)
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}
      >
        <Header />
        <View style={styles.input}>
          <TextInput
            value={searchVal}
            onChangeText={(val) => searchExercise(val)}
            placeholder='Search Exercises'
            style={styles.inputTextField}
          />
        </View>
        <FlatList
          data={workouts}
          renderItem={({ item, index }: any) => {
            return (
              <>
                {item.name.toLowerCase().includes(searchVal.toLowerCase()) ? (
                  <View
                    style={{
                      marginHorizontal: window.width - window.width / 1.05,
                      borderColor: 'rgba(100,100,100,0.25)',
                      padding: 8,
                      borderBottomWidth: 1,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => specificView(item)}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      {/* <Text style={[styles.txt, { fontSize: 20 }]}>
                      {index + 1}
                    </Text> */}
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginVertical: 5
                        }}
                      >
                        <View
                          style={{
                            width: 75,
                            height: 75,
                            borderRadius: 100,
                            overflow: 'hidden',
                            borderWidth: 1.2,
                            borderColor: "#ccc",
                          }}
                        >
                          <Image
                            source={{ uri: item.gifUrl }}
                            style={{
                              width: 75,
                              height: 75,
                              borderRadius: 100,
                            }}
                          />
                        </View>
                        <Text style={[styles.titleTxt, { marginLeft: 15 }]}>
                          {item.name.split(' ')[0]} {item.name.split(' ')[1]}{' '}
                          {item.name.split(' ')[2]}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <></>
                )}
              </>
            )
          }}
          numColumns={1}
          keyExtractor={(item, idx) => idx.toString()}
        />
      </View>
      <Modal
        animationType='fade'
        visible={specificWorkout}
        transparent={true}
        onRequestClose={() => setSpecificWorkout(!specificWorkout)}
      >
        <View style={{ backgroundColor: '#ffffff' }}>
          <View
            style={{
              alignItems: 'center',
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <Image
              source={{ uri: exerciseItem?.gifUrl }}
              style={{ width: 250, height: 250, resizeMode: 'contain' }}
            />
            <Text
              style={[styles.titleTxt, { fontSize: 28, textAlign: 'center' }]}
            >
              {exerciseItem?.name}
            </Text>
            {/* <Text style={[styles.txt, { textAlign: 'center' }]}>
              {exerciseItem.name}
            </Text> */}
          </View>
        </View>
      </Modal>
      {listView && (
        <Text
          style={{
            fontSize: 40,
            alignSelf: 'center',
            fontFamily: 'Comfortaa-Bold',
            color: 'rgb(80,80,80)',
          }}
        >
          {watch}
        </Text>
      )}
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
    fontSize: 18,
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
    padding: 10,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    marginHorizontal: 20,
  },
  inputTextField: {
    width: 250,
    marginHorizontal: 10,
  },
})

import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import Header from '../Components/Header'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import { setExerciseTarget } from '../redux/states/workoutSlice'

export default function ChooseExercises() {
  const navigation = useNavigation<any>()
  const dispatch = useDispatch()

  const targetBodyPart = [
    { name: 'chest', img: require(`../assets/imgs/chest.png`) },
    { name: 'back', img: require(`../assets/imgs/back.png`) },
    { name: 'shoulders', img: require(`../assets/imgs/shoulders.png`) },
    { name: 'arms', img: require(`../assets/imgs/arms.png`) },
    { name: 'legs', img: require(`../assets/imgs/legs.png`) },
  ]

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Header />
        <View style={{ marginHorizontal: 10 }}>
          <Text style={styles.txt}>Choose Exercises</Text>
          <FlatList
            data={targetBodyPart}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1 / 2,
                    flexDirection: 'column',
                    marginVertical: 9,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setExerciseTarget(item.name))
                      navigation.navigate('TargetExercise')
                    }}>
                    <LinearGradient
                      colors={['#C58BF233', '#EEA4CE22']}
                      style={{ alignItems: 'center', borderRadius: 15 }}>
                      <View
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 100,
                          alignItems: 'center',
                          overflow: 'hidden',
                          paddingTop: '15%',
                        }}>
                        <Image
                          source={item.img}
                          style={{ width: 80, height: 80, resizeMode: 'contain', borderRadius: 100 }}
                        />
                      </View>
                      <View
                        style={{
                          borderBottomLeftRadius: 13,
                          borderBottomRightRadius: 13,
                          borderTopLeftRadius: 3,
                          borderTopRightRadius: 3,
                          opacity: 0.85,
                          width: 145,
                          paddingBottom: 10,
                        }}>
                        <Text style={styles.tileTitle}>{item.name}</Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )
            }}
            numColumns={2}
            keyExtractor={(_, idx) => idx.toString()}
          />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  txt: {
    marginHorizontal: 20,
    fontFamily: 'Poppins_Bold',
    color: 'rgb(80,80,80)',
    fontSize: 20,
  },
  tileTitle: {
    fontFamily: 'Poppins_Bold',
    // color: '#92A3FD',
    color: '#555',
    textTransform: 'capitalize',
    fontSize: 14,
    width: 155,
    borderRadius: 10,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  input: {
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F7F8F8',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    fontSize: 20,
    marginHorizontal: 20,
  },
  inputTextField: {
    width: 250,
    marginHorizontal: 10,
  },
})

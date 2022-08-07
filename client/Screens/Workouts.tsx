import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
} from 'react-native'
import Header from '../Components/Header'
import { useColorScheme } from 'react-native-appearance'
import { useNavigation, NavigationProp } from '@react-navigation/native'

type navigationList = {
  FoodScan: undefined
  Specific_Exercise: undefined | any
  Workouts: undefined
  BMI: undefined
  WalkSteps: undefined
}
export default function Workouts() {
  let colorScheme = useColorScheme()
  const window = Dimensions.get('window')
  const navigation = useNavigation<NavigationProp<navigationList>>()

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
        }}
      >
        <Header />
        <View style={{ paddingHorizontal: 15, paddingBottom: 150 }}>
          <FlatList
            data={targetBodyPart}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flex: 1 / 2,
                    flexDirection: 'column',
                    marginVertical: 15,
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Specific_Exercise', {
                        exerciseTarget: item.name,
                      })
                    }}
                    style={{
                      borderColor: '#ccc',
                      borderRadius: 15,
                      borderWidth: 1,
                      height: 150,
                      width: 150,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={item.img}
                      style={{ width: 120, height: 120, resizeMode: 'contain' }}
                    />
                    <Text style={styles.tileTitle}>{item.name}</Text>
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
    marginHorizontal: 8,
    fontFamily: 'Poppins_Bold',
    color: 'rgb(80,80,80)',
    fontSize: 20,
  },
  tileTitle: {
    fontFamily: 'Poppins',
    color: 'rgb(80,80,80)',
    textTransform: 'capitalize',
    fontSize: 16,
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

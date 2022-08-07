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
import { Btn } from '../Components/Button'
import { LinearGradient } from 'expo-linear-gradient'

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
                      borderColor: '#ccc', //92A3FD
                      borderRadius: 15,
                      borderWidth: 1,
                      height: 165,
                      width: 165,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={item.img}
                      style={{ width: 120, height: 120, resizeMode: 'contain' }}
                    />
                    <LinearGradient
                      colors={['#92A3FD', '#92A3FD']}
                      style={{
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderTopLeftRadius: 3,
                        borderTopRightRadius: 3,
                        marginTop: 5
                      }}
                    >
                      <Text style={styles.tileTitle}>{item.name}</Text>
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
    marginHorizontal: 8,
    fontFamily: 'Poppins_Bold',
    color: 'rgb(80,80,80)',
    fontSize: 20,
  },
  tileTitle: {
    fontFamily: 'Poppins',
    // color: '#92A3FD',
    color: '#fff',
    textTransform: 'capitalize',
    fontSize: 16,
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

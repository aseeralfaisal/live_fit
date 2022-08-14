import * as React from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native'
import Header from '../Components/Header'
import { useColorScheme } from 'react-native-appearance'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Btn } from '../Components/Button'

export default function BMI() {
  let colorScheme = useColorScheme()
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)

  const [bmi, setBMI] = useState(0)
  const [bodyweight, setBodyweight] = useState('')
  const [height, setHeight] = useState('')
  const [healthStatus, setHealthStatus] = useState('N/A')

  const calculateBmi = () => {
    let sum = +bodyweight / Math.pow(+height, 2)
    setBMI(+sum.toFixed(1))
  }

  useEffect(() => {
    if (bmi <= 18.5) {
      setHealthStatus('Underweight')
    } else if (bmi >= 18.6 && bmi <= 24.9) {
      setHealthStatus('Fit')
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      setHealthStatus('Overweight')
    } else if (bmi >= 30) {
      setHealthStatus('Obese')
    } else {
      setHealthStatus('n/a')
    }
  }, [calculateBmi])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}
    >
      <Header />
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <AnimatedCircularProgress
            size={180}
            width={25}
            fillLineCap='round'
            lineCap='round'
            fill={48}
            tintColor='#C58BF2'
            backgroundColor='#3d5875'
          />
          <Text style={styles.bmi}>{bmi}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
          <LinearGradient
            colors={['#92A3FD55', '#9DCEFF33']}
            style={{
              width: 315,
              height: 40,
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                color: '#555',
                fontWeight: 'bold',
                marginHorizontal: 30,
              }}
            >
              BMI
            </Text>
            <Image
              source={require('../assets/icons/down-arrow.png')}
              style={{ width: 20, height: 20, marginHorizontal: 30 }}
            />
          </LinearGradient>
        </TouchableOpacity>
        <View style={{ justifyContent: 'center' }}>
          <TextInput
            value={height}
            onChangeText={(text) => setHeight(text)}
            style={styles.inputField}
            placeholder='Height (m)'
            placeholderTextColor='rgb(150,150,150)'
            keyboardType='numeric'
          />
          <Image
            source={require('../assets/icons/edit.png')}
            style={styles.editIconStyle}
          />
        </View>
        <View style={{ justifyContent: 'center' }}>
          <TextInput
            value={bodyweight}
            onChangeText={(text) => setBodyweight(text)}
            style={styles.inputField}
            placeholder='Bodyweight (Kg)'
            placeholderTextColor='rgb(150,150,150)'
            keyboardType='numeric'
          />
          <Image
            source={require('../assets/icons/edit.png')}
            style={styles.editIconStyle}
          />
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={calculateBmi}>
          <Btn title='Calculate' loading={false} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={calculateBmi}>
          <LinearGradient
            colors={['#92A3FD', '#9DCEFF']}
            style={{
              height: 50,
              width: 315,
              borderRadius: 100,
              justifyContent: 'center',
              marginTop: 20,
            }}
          >
            <Text style={styles.btnText}>Calculate</Text>
          </LinearGradient>
        </TouchableOpacity> */}

        {/* <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginVertical: 20,
          }}
        >
          <Text style={styles.status}>{healthStatus}</Text>
          <Text style={styles.result}> for your height.</Text>
        </View> */}
        <Modal
          animationType='slide'
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
          transparent={true}
        >
          <View
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#ccc',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              position: 'absolute',
              width: '100%',
              height: '50%',
              bottom: 0,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity>
                <LinearGradient
                  colors={['#92A3FD', '#9DCEFF']}
                  style={{
                    height: 50,
                    width: 315,
                    borderRadius: 100,
                    justifyContent: 'center',
                    marginTop: 20,
                  }}
                >
                  <Text style={styles.btnText}>OK</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 170,
  },
  editIconStyle: {
    position: 'absolute',
    width: 24,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  bmi: {
    fontFamily: 'Poppins',
    fontSize: 35,
    marginTop: 20,
    color: '#92A3FD',
    position: 'absolute',
  },
  btn: {
    marginTop: 20,
    paddingVertical: 10,
    marginHorizontal: 60,
    backgroundColor: '#FF8C53',
    borderRadius: 20,
  },
  btnText: {
    alignSelf: 'center',
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  inputField: {
    marginVertical: 14,
    color: 'rgba(80,80,80,0.85)',
    textAlign: 'center',
    backgroundColor: '#F7F8F8',
    fontFamily: 'Poppins',
    fontWeight: '400',
    borderRadius: 100,
    fontSize: 14,
    height: 50,
    width: 315,
    // alignSelf: 'center',
    // ...Platform.select({
    //   ios: {
    //     fontFamily: 'Comfortaa-Bold',
    //   },
    //   android: {
    //     fontFamily: 'Comfortaa-Bold',
    //   },
    // }),
  },
  status: {
    color: '#FF8C53',
    fontSize: 40,
  },
  result: {
    color: 'rgb(80,80,80)',
    fontSize: 25,
  },
})

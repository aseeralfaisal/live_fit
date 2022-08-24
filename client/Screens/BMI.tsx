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
  Button,
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
  const [ffmi, setFfmi] = useState(0)
  const [massIndexMethod, setMassIndexMethod] = useState('BMI')
  const [bodyweight, setBodyweight] = useState('')
  const [leanweight, setLeanweight] = useState('')
  const [height, setHeight] = useState('')
  const [bmiHealthStatus, setBmiHealthStatus] = useState('')
  const [ffmiHealthStatus, setFfmiHealthStatus] = useState('')
  const [fatPercentage, setFatPercentage] = useState(0)
  const [fillCircle, setfillCircle] = useState(48)

  const calculateBmi = () => {
    let sum = +bodyweight / Math.pow(+height, 2)
    setBMI(+sum.toFixed(1))
  }
  const calculateFfmi = () => {
    const leanMassItem = +bodyweight * (1 - +fatPercentage / 100)
    let sum = ((leanMassItem / 2.2) * 2.20462) / Math.pow(+height, 2)
    setFfmi(+sum.toFixed(1))
  }

  useEffect(() => {
    if (bmi <= 18.5) {
      setBmiHealthStatus('Underweight')
    } else if (bmi >= 18.6 && bmi <= 24.9) {
      setBmiHealthStatus('Fit')
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      setBmiHealthStatus('Overweight')
    } else if (bmi >= 30) {
      setBmiHealthStatus('Obese')
    } else {
      setBmiHealthStatus('')
    }
  }, [calculateBmi])

  useEffect(() => {
    if (ffmi < 18 && fatPercentage > 10 && fatPercentage < 18) {
      setFfmiHealthStatus('Skinny guy')
    } else if (ffmi > 18 && ffmi < 20 && fatPercentage > 20 && fatPercentage < 27) {
      setFfmiHealthStatus('Average guy')
    } else if (ffmi > 19 && ffmi < 21 && fatPercentage > 25 && fatPercentage < 40) {
      setFfmiHealthStatus('Fat guy')
    } else if (ffmi > 20 && ffmi < 21 && fatPercentage > 10 && fatPercentage < 18) {
      setFfmiHealthStatus('Athlete/ Gym User')
    } else if (ffmi > 22 && ffmi < 23 && fatPercentage > 6 && fatPercentage < 12) {
      setFfmiHealthStatus('Advanced Athlete/ Bodybuilder')
    } else if (ffmi > 24 && ffmi < 25 && fatPercentage > 8 && fatPercentage < 20) {
      setFfmiHealthStatus('Elite Strength Athlete/ Bodybuilder')
    }
  }, [calculateFfmi])

  const bmiTintColor = () => {
    return
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <Header />
      <View style={{ alignItems: 'center' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 24,
          }}>
          <AnimatedCircularProgress
            size={180}
            width={25}
            fillLineCap='round'
            lineCap='round'
            fill={fillCircle}
            tintColor="#C58BF2" //#C58BF2
            backgroundColor='#3d5875'
          />
          <Text style={styles.bmi}>{massIndexMethod === 'BMI' ? bmi : ffmi}</Text>
        </View>
        <Text style={{ color: 'red', fontFamily: 'Poppins_Bold', fontSize: 20, marginVertical: 20 }}>
          {bmiHealthStatus === '' && ffmiHealthStatus === '' && massIndexMethod === 'BMI'
            ? bmiHealthStatus
            : ffmiHealthStatus}
        </Text>
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
            }}>
            <Text
              style={{
                color: '#555',
                fontWeight: 'bold',
                marginHorizontal: 30,
              }}>
              {massIndexMethod}
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
          <Image source={require('../assets/icons/edit.png')} style={styles.editIconStyle} />
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
          <Image source={require('../assets/icons/edit.png')} style={styles.editIconStyle} />
        </View>
        {massIndexMethod === 'FFMI' && (
          <View style={{ justifyContent: 'center' }}>
            <TextInput
              value={fatPercentage}
              onChangeText={(text) => setFatPercentage(text)}
              style={styles.inputField}
              placeholder='Fat percentage'
              placeholderTextColor='rgb(150,150,150)'
              keyboardType='numeric'
            />
            <Image source={require('../assets/icons/edit.png')} style={styles.editIconStyle} />
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => (massIndexMethod === 'BMI' ? calculateBmi() : calculateFfmi())}>
          <Btn title='Calculate' loading={false} />
        </TouchableOpacity>
        <Modal
          animationType='slide'
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
          transparent={true}>
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
            }}>
            <Text style={{ color: '#777', fontFamily: 'Poppins', margin: 20, marginLeft: 40 }}>
              Note: This FFMI calculator is dedicated to estimating Fat-Free Mass Index of your body. This
              method is more precise in comparison to the BMI (Body Mass Index) and overcomes its shortcomings
              when dealing with people who are well trained, as well as professional sportsmen.
            </Text>
            <TouchableOpacity
              onPress={() => setMassIndexMethod('BMI')}
              style={[
                styles.chooseMI,
                { backgroundColor: massIndexMethod === 'BMI' ? '#92A3FD55' : '#cccccc30' },
              ]}>
              <Text
                style={{
                  color: '#777',
                  fontFamily: 'Poppins_Bold',
                  fontSize: 16,
                  textAlignVertical: 'center',
                }}>
                BMI
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMassIndexMethod('FFMI')}
              style={[
                styles.chooseMI,
                { backgroundColor: massIndexMethod === 'FFMI' ? '#92A3FD55' : '#cccccc30' },
              ]}>
              <Text
                style={{
                  color: '#777',
                  fontFamily: 'Poppins_Bold',
                  fontSize: 16,
                  textAlignVertical: 'center',
                }}>
                FFMI
              </Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <View
                  style={{
                    height: 50,
                    width: 315,
                    borderRadius: 100,
                    alignItems: 'center',
                    // marginTop: 20,
                  }}>
                  <Btn title='Close' />
                </View>
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
  chooseMI: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 16,
    borderColor: '#ccc',
    marginHorizontal: 40,
    height: 50,
    marginVertical: 10,
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

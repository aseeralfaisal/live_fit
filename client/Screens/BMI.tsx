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
import axios from 'axios'
import { BASE_URI } from '../URI'
import { CHANGE_INFO } from '../Queries/CAHNGE_INFO'
import { GET_USER_INFO } from '../Queries/GET_USER_INFO'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import { changeBmi } from '../redux/states/bmiSLice'
import { fillColor } from '../Reusables/fillColor'

export default function BMI() {
  const dispatch = useDispatch()
  const userName = useAppSelector((state) => state.user.userVal)
  let colorScheme = useColorScheme()
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const bmi = useAppSelector((state) => state.bmi.bmi)
  const [ffmi, setFfmi] = useState(0)
  const [massIndexMethod, setMassIndexMethod] = useState('BMI')
  const [weight, setweight] = useState('')
  const [height, setHeight] = useState('')
  const [bmiHealthStatus, setBmiHealthStatus] = useState('')
  const [ffmiHealthStatus, setFfmiHealthStatus] = useState('')
  const [fatPercentage, setFatPercentage] = useState(0)
  const [fillCircle, setfillCircle] = useState(0)
  const [userInfos, setUserInfos] = useState<number | null>(null)

  const getUserInfos = async () => {
    const res = await axios.post(BASE_URI, {
      query: GET_USER_INFO,
      variables: {
        user: userName,
      },
    })
    return res.data.data.getUserInfo
  }
  React.useEffect(() => {
    let ignore = false
    ;(async () => {
      const userData = await getUserInfos()
      const bmiVal = (userData.weight / Math.pow(userData.height, 2)).toFixed(2)
      const fill = (+bmiVal / 25) * 100
      setfillCircle(fill)
      dispatch(changeBmi(+bmiVal.toString()))
    })()
    return () => {
      ignore = true
    }
  }, [])

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
            width={20}
            fillLineCap='butt'
            lineCap='butt'
            fill={fillCircle}
            tintColor={fillColor()} //#C58BF2
            backgroundColor='#3d5875'
          />
          <Text style={styles.bmi}>{massIndexMethod === 'BMI' ? bmi : ffmi}</Text>
        </View>
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

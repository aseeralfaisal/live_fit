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
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Btn } from '../Components/Button'
import axios from 'axios'
import { BASE_URI } from '../URI'
import { CHANGE_INFO } from '../Queries/CAHNGE_INFO'
import { GET_USER_INFO } from '../Queries/GET_USER_INFO'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import { changeBmi, setMassIndexMethod } from '../redux/states/bmiSlice'
import { fillColor } from '../Reusables/fillColor'
import { bmiColors } from '../Reusables/bmiColors'
import { GradiantRoundBox } from '../Components/GradiantRoundBox'
import MainButton from '../Components/MainButton'

export default function BMI() {
  const dispatch = useDispatch()
  const userName = useAppSelector((state) => state.user.userVal)
  const massIndexMethod = useAppSelector((state) => state.bmi.massIndexMethod)
  const BMI = useAppSelector((state) => state.bmi.bmi)
  const [userInfo, setUserInfo] = useState<any>(0)

  React.useEffect(() => {
    const getUserInfos = async () => {
      const res = await axios.post(BASE_URI, {
        query: GET_USER_INFO,
        variables: {
          user: userName,
        },
      })
      setUserInfo(res.data.data.getUserInfo)
    }
    getUserInfos()
  }, [])

  const BMIType = ({ bgColor, title, desc }: { bgColor: string; title: string; desc: string }) => {
    const bmiColorStyle = { width: 48, margin: 10, height: 48, borderRadius: 10 }
    const BMIText = ({ title }: { title: string }) => {
      return <Text style={{ fontFamily: 'Poppins', color: '#999', fontSize: 14 }}>{title}</Text>
    }

    return (
      <View style={styles.bmiRangeStyle}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ ...bmiColorStyle, backgroundColor: `${bgColor}` }}></View>
          <View style={{ alignItems: 'flex-start' }}>
            <Text style={{ color: '#999', fontFamily: 'Poppins_Bold', fontSize: 16 }}>{title}</Text>
            <BMIText title={desc} />
          </View>
        </View>
      </View>
    )
  }

  const { weight, height, bodyFat }: { weight: number; height: number; bodyFat: number } = userInfo
  const bmiVal = weight / Math.pow(height, 2)
  const ffmiVal = (weight * (1 - bodyFat / 100)) / Math.pow(height, 2)

  const changeMassIndexMethod = () => {
    if (massIndexMethod === 'BMI') {
      dispatch(setMassIndexMethod('FFMI'))
    } else {
      dispatch(setMassIndexMethod('BMI'))
    }
  }
  const massIndex = massIndexMethod === 'FFMI' ? ffmiVal : bmiVal
  const fill = Math.floor((+massIndex / 25) * 100)
  React.useEffect(() => {
    dispatch(changeBmi(massIndex))
  }, [massIndex])

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
            fill={fill ? fill : 0}
            tintColor={fillColor()} //#C58BF2
            backgroundColor='#3d5875'
          />
          <Text style={styles.bmi}>
            {(BMI).toFixed(2).toString()}
          </Text>
        </View>
        <View style={{ marginBottom: 50 }}>
          <BMIType bgColor={bmiColors.underweight} title='Underweight' desc='Greater than 18.5' />
          <BMIType bgColor={bmiColors.healthyWeight} title='Healthy Weight' desc='Between 18.5 to 24.9' />
          <BMIType bgColor={bmiColors.overweight} title='Over Weight' desc='Between 25 to 29.9' />
          <BMIType bgColor={bmiColors.obese} title='Obese' desc='Greater than 30' />
        </View>
        <MainButton
          title={massIndexMethod === 'BMI' ? 'Change to FFMI Mode' : 'Change to BMI Mode'}
          width={300}
          onPress={changeMassIndexMethod}
        />
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
  bmiRangeStyle: { flexDirection: 'column', alignItems: 'flex-start' },
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

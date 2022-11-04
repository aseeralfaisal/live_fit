import * as React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../Components/Header'
import { useColorScheme } from 'react-native-appearance'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setIsAuthenticated } from '../redux/states/authenticatedSlice'
import MainButton from '../Components/MainButton'
import { LineChart, ProgressChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BASE_URI } from '../URI'
import { SEVEN_DAY_MEALS_QUERY } from '../Queries/SEVEN_DAY_MEALS_QUERY'
import axios from 'axios'
import InfoChangePopup from '../Components/popups/InfoChangePopup'
import { GET_USER_INFO } from '../Queries/GET_USER_INFO'
import { useAppSelector } from '../redux/hooks'
import { changePopupTitle, setUserInfo } from '../redux/states/userSlice'

interface userInfoTypes {
  calorieGoal: number
  height: number
  weight: number
  bodyFat: number
  squat: number
  bench: number
  deadlift: number
}
export default function About() {
  let colorScheme = useColorScheme()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const userName = useAppSelector((state) => state.user.userVal)
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const [graphDataValues, setGraphDataValues] = React.useState<number[]>([])
  const [graphDataLoaded, setGraphDataLoaded] = React.useState(false)
  const [popup, setPopup] = React.useState(false)
  const [infoType, setInfoType] = React.useState('')
  const screenWidth = Dimensions.get('window').width - 80
  const popupTitle = useAppSelector((state) => state.user.popupTitle)

  React.useEffect(() => {
    axios
      .post(BASE_URI, {
        query: SEVEN_DAY_MEALS_QUERY,
      })
      .then((res) => {
        let dataArr: number[] = []
        res.data.data.sevenDaysIntake.map((meal: { calories: number }) => {
          dataArr.push(meal.calories)
        })
        setGraphDataValues(dataArr)
        setGraphDataLoaded(true)
      })
  }, [])
  const graphData = {
    // labels: ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'],
    datasets: [
      {
        data: graphDataValues,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    // legend: ['Over eaten'],
  }
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.0,
    color: () => '#999',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  }

  interface propTypes {
    infoTitle: string
    value: number | undefined
    type: string
  }
  const pressEvent = (type: string) => {
    setInfoType(type)
    let aboutTitle = ''
    if (type === 'calorieGoal') {
      aboutTitle = `Calorie Goal`
    } else if (type === 'bodyFat') {
      aboutTitle = 'Set Body Fat'
    } else {
      aboutTitle = type
    }
    dispatch(changePopupTitle(aboutTitle))
    setPopup(true)
  }
  const BigThreeLifts = ({ infoTitle, value, type }: propTypes) => {
    return (
      <TouchableOpacity activeOpacity={0.6} onPress={() => pressEvent(type)}>
        <LinearGradient colors={['#eeeeee', '#eeefff']} style={styles.box}>
          <Text style={styles.infoValue}>{value} kg</Text>
          <Text style={styles.infoTitle}>{infoTitle}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  const AboutListTile = ({ title, value }: { title: string; value: number | string }) => {
    return (
      <LinearGradient
        colors={['#C58BF211', '#EEA4CE11']}
        style={{
          marginVertical: 7,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          borderColor: '#C58BF233',
          borderWidth: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '85%',
          }}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={styles.valueStyle}>{value}</Text>
        </View>
      </LinearGradient>
    )
  }

  const getUserInfos = async () => {
    const res = await axios.post(BASE_URI, {
      query: GET_USER_INFO,
      variables: {
        user: userName,
      },
    })
    dispatch(setUserInfo(res.data.data.getUserInfo))
  }
  React.useEffect(() => {
    let ignore = false
    getUserInfos()
    return () => {
      ignore = true
    }
  }, [userInfo])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <Header />
      <View style={{ flex: 1 }}>
        <View style={styles.bodyInfoParent}>
          <BigThreeLifts infoTitle='Squat' value={userInfo?.squat} type='squat' />
          <BigThreeLifts infoTitle='Bench' value={userInfo?.bench} type='bench' />
          <BigThreeLifts infoTitle='Deadlift' value={userInfo?.deadlift} type='deadlift' />
        </View>
        {graphDataLoaded && (
          <View
            style={{ marginLeft: Dimensions.get('window').width - 360, marginBottom: -10, marginTop: -20 }}>
            <LineChart
              bezier
              data={graphData}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              radius={32}
            />
            <Text
              style={[
                styles.infoTitle,
                { alignSelf: 'center', marginBottom: 14, marginTop: -14, color: '#aaa' },
              ]}>
              A week of calorie intake
            </Text>
          </View>
        )}
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => pressEvent('calorieGoal')}>
            <AboutListTile title='Calorie Goal' value={userInfo ? userInfo?.calorieGoal + ' cal' : ''} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressEvent('height')}>
            <AboutListTile title='Height' value={userInfo?.height ? userInfo?.height + ' m' : ''} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressEvent('weight')}>
            <AboutListTile title='Weight' value={userInfo?.weight ? userInfo?.weight + ' kg' : ''} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => pressEvent('bodyFat')}>
            <AboutListTile title='BodyFat' value={userInfo?.bodyFat ? userInfo.bodyFat + ' %' : ''} />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 7 }}>
          <MainButton
            horizontalMargin='default'
            title='Sign out'
            onPress={() => {
              dispatch(setIsAuthenticated(false))
            }}
          />
        </View>
        <InfoChangePopup popup={popup} setPopup={setPopup} type={infoType} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueStyle: {
    fontFamily: 'Poppins_Bold',
    color: '#92A3FD',
    borderRadius: 10,
    borderWidth: 0,
    fontSize: 14,
  },
  titleStyle: {
    fontFamily: 'Poppins_Bold',
    textTransform: 'capitalize',
    borderRadius: 10,
    textAlign: 'left',
    color: '#777',
    fontSize: 14,
  },
  infoValue: { color: '#92A3FD', fontFamily: 'Poppins_Bold', fontSize: 18 },
  infoTitle: { fontFamily: 'Poppins', fontSize: 16, color: '#777' },
  bodyInfoParent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
    marginHorizontal: 20,
  },
})

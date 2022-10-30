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

export default function About() {
  let colorScheme = useColorScheme()
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [graphDataValues, setGraphDataValues] = React.useState<number[]>([])
  const [graphDataLoaded, setGraphDataLoaded] = React.useState(false)

  const screenWidth = Dimensions.get('window').width - 80
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
    value: string
  }
  const BigThreeLifts = ({ infoTitle, value }: propTypes) => {
    return (
      <TouchableOpacity activeOpacity={0.6}>
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
          marginHorizontal: 28,
          marginVertical: 7,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          borderColor: '#C58BF233',
          borderWidth: 1,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.titleStyle}>{title}</Text>
          <Text style={styles.valueStyle}>{value}</Text>
        </View>
      </LinearGradient>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <Header />
      <View style={{ flex: 1 }}>
        <View style={styles.bodyInfoParent}>
          <BigThreeLifts infoTitle='Squat' value='165' />
          <BigThreeLifts infoTitle='Bench' value='110' />
          <BigThreeLifts infoTitle='Deadlift' value='180' />
        </View>
        {graphDataLoaded && (
          <View style={{ marginLeft: Dimensions.get('window').width - 360, marginBottom: -10, marginTop: -20 }}>
            <LineChart
              bezier
              data={graphData}
              width={screenWidth}
              height={200}
              chartConfig={chartConfig}
              radius={32}
            />
            <Text style={[styles.infoTitle, { alignSelf: 'center', marginBottom: 14, marginTop: -14, color: "#aaa" }]}>
              A week of calorie intake
            </Text>
          </View>
        )}
        <AboutListTile title='Calorie Goal' value={200} />
        <AboutListTile title='Height' value={170} />
        <AboutListTile title='Weight' value={70} />
        <AboutListTile title='BodyFat' value={15 + '%'} />
        <View style={{ marginTop: 7 }}>
          <MainButton
            horizontalMargin='default'
            title='Sign out'
            onPress={() => {
              dispatch(setIsAuthenticated(false))
            }}
          />
        </View>
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
    marginLeft: 70,
  },
  titleStyle: {
    fontFamily: 'Poppins_Bold',
    textTransform: 'capitalize',
    width: 200,
    borderRadius: 10,
    textAlign: 'left',
    color: '#777',
    marginHorizontal: 10,
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

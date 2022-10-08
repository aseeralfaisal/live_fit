import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Header from '../Components/Header'
import { useColorScheme } from 'react-native-appearance'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setIsAuthenticated } from '../redux/states/authenticatedSlice'
import MainButton from '../Components/MainButton'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function About() {
  let colorScheme = useColorScheme()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const screenWidth = Dimensions.get('window').width - 50
  const data = {
    labels: ['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'],
    datasets: [
      {
        data: [1800, 1450, 1150, 1705, 1780, 1980],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 4, // optional
      },
    ],
    // legend: ['Over eaten'],
  }
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.0,
    color: () => '#555',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
  }

  interface propTypes {
    infoTitle: string
    value: string
  }
  const BodyInfo = ({ infoTitle, value }: propTypes) => {
    const unitGetter = () => {
      if (infoTitle === 'Height') {
        return 'cm'
      } else if (infoTitle === 'Weight') {
        return 'kg'
      } else {
        return 'yrs'
      }
    }
    return (
      <TouchableOpacity activeOpacity={0.6}>
        <LinearGradient colors={['#eeeeee', '#eeefff']} style={styles.box}>
          <Text style={styles.infoValue}>
            {value} {unitGetter()}
          </Text>
          <Text style={styles.infoTitle}>{infoTitle}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <Header />
      <View style={styles.bodyInfoParent}>
        <BodyInfo infoTitle='Height' value='180' />
        <BodyInfo infoTitle='Weight' value='65' />
        <BodyInfo infoTitle='Age' value='22' />
      </View>
      <View style={{ marginLeft: 20, marginBottom: 20 }}>
        <LineChart data={data} width={screenWidth} height={250} chartConfig={chartConfig} />
      </View>
      <MainButton
        horizontalMargin={"default"}
        title='Sign out'
        onPress={() => {
          dispatch(setIsAuthenticated(false))
        }}
      />
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
  infoValue: { color: '#92A3FD', fontFamily: 'Poppins_Bold', fontSize: 18 },
  infoTitle: { fontFamily: 'Poppins', fontSize: 16, color: '#777' },
  bodyInfoParent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
    marginHorizontal: 20,
  },
})

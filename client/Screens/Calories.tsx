import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Header from '../Components/Header'
import axios from 'axios'
import { GET_CALORIES } from '../Queries/GET_CALORIES'
import { Picker } from '@react-native-picker/picker'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setNutritionResult } from '../redux/states/nutritionSlice'
import { BASE_URL } from '@env'
import { CalorieResult } from '../Components/popups/CalorieResult'
import BreakfastSVG from '../assets/breakfast.svg'
import LunchSVG from '../assets/lunch.svg'
import { LineChart } from 'react-native-chart-kit'
import { SEVEN_DAY_MEALS_QUERY } from '../Queries/SEVEN_DAY_MEALS_QUERY'

export default function Calories() {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  const [foodSeachVal, setFoodSeachVal] = React.useState('')
  const [inputBorderColor, setInputBorderColor] = React.useState('#ccc')
  const [servingSize, setServingSize] = React.useState('100g')
  const [resultPopup, setResultPopup] = useState(false)
  const [resultLoader, setResultLoader] = useState(true)
  const [graphDataValues, setGraphDataValues] = useState<number[]>([])
  const [graphDataLoaded, setGraphDataLoaded] = useState(false)

  const searchMeals = async () => {
    try {
      setResultPopup(true)
      const res = await axios.post(BASE_URL, {
        query: GET_CALORIES,
        variables: {
          query: `${servingSize} ${foodSeachVal}`,
        },
      })
      dispatch(setNutritionResult(res.data.data.getFoodCalories))
      setResultLoader(false)
    } catch (err) {
      console.log(err)
    }
  }

  const screenWidth = Dimensions.get('window').width - 50
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

  const mealsData = [<BreakfastSVG />, <LunchSVG />]

  useEffect(() => {
    axios
      .post(BASE_URL, {
        query: SEVEN_DAY_MEALS_QUERY,
      })
      .then((res) => {
        console.log(res.data)
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

  return (
    <>
      <Header />
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View style={{ alignItems: 'center' }}>
          <View style={[styles.input, { borderColor: inputBorderColor, flexDirection: 'row' }]}>
            <TextInput
              onFocus={() => setInputBorderColor('#92A3FD')}
              onBlur={() => setInputBorderColor('#ccc')}
              value={foodSeachVal}
              onChangeText={(val) => setFoodSeachVal(val)}
              placeholder='Search...'
              onEndEditing={() => searchMeals()}
              style={styles.inputTextField}
            />
            <Picker
              style={{ color: '#999', fontFamily: 'Poppins', marginLeft: -45, width: 50, height: 20 }}
              selectedValue={servingSize}
              onValueChange={(value) => setServingSize(value)}>
              {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num, index) => {
                return <Picker.Item key={index} label={`${num} g`} value={`${num}g`} />
              })}
            </Picker>
            <TouchableOpacity onPress={() => navigation.navigate('FoodScan')}>
              <Image
                source={require('../assets/icons/camera.png')}
                style={{ width: 32, height: 32, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginLeft: 20, marginBottom: 20 }}>
          {graphDataLoaded && (
            <LineChart bezier data={graphData} width={screenWidth} height={250} chartConfig={chartConfig} />
          )}
        </View>
        <FlatList
          data={mealsData}
          keyExtractor={(_, idx) => idx.toString()}
          renderItem={({ item }) => {
            return <TouchableOpacity>{item}</TouchableOpacity>
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <CalorieResult
          resultLoader={resultLoader}
          resultPopup={resultPopup}
          setResultPopup={setResultPopup}
          foodSeachVal={foodSeachVal}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderRadius: 16,
    backgroundColor: '#F8F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Poppins',
    marginHorizontal: 20,
    borderWidth: 1,
    width: 320,
    marginVertical: 20,
  },
  inputTextField: {
    width: 250,
    fontSize: 14,
    marginHorizontal: 10,
  },
})

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
import BreakfastSVG from '../assets/icons/breakfast.svg'
import LunchSVG from '../assets/icons/lunch.svg'
import SnackSVG from '../assets/icons/snack.svg'
import DinnerSVG from '../assets/icons/dinner.svg'
import PlusSVG from '../assets/icons/plus.svg'
import { BarChart, LineChart } from 'react-native-chart-kit'
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

  const screenWidth = Dimensions.get('window').width - 40
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

  type objectsType = {
    title: string
    icon: Object
  }
  const mealsData: objectsType[] = [
    { title: 'Breakfast', icon: <BreakfastSVG /> },
    { title: 'Lunch', icon: <LunchSVG /> },
    { title: 'Snack', icon: <SnackSVG /> },
    { title: 'Dinner', icon: <DinnerSVG /> },
  ]

  useEffect(() => {
    axios
      .post(BASE_URL, {
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
              placeholder='Search Food...'
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
        {/* <View style={{ alignItems: 'flex-start' }}>
          {graphDataLoaded && (
            <LineChart bezier data={graphData} width={screenWidth} height={220} chartConfig={chartConfig} />
          )}
        </View> */}
        <View
          style={{
            alignItems: 'center',
            marginHorizontal: 20,
            backgroundColor: 'rgba(100,100,100,0.03)',
            borderRadius: 12,
          }}>
          <FlatList
            data={mealsData}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ marginVertical: 10 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginHorizontal: 30,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 10,
                      }}>
                      <View style={{ marginHorizontal: 10 }}>{item.icon}</View>
                      <Text
                        style={{
                          fontFamily: 'Poppins_Bold',
                          fontSize: 14,
                          color: '#777',
                          marginRight: 200,
                          width: 80,
                        }}>
                        {item.title}
                      </Text>
                    </View>
                    <PlusSVG />
                  </View>
                  {/* <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#DDDADA99',
                      borderRadius: 8,
                      height: 38,
                      marginVertical: 20,
                    }}>
                    <Text style={[styles.titleTxt, { color: '#777' }]}>Add Food</Text>
                  </TouchableOpacity> */}
                </View>
              )
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
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
  titleTxt: {
    fontFamily: 'Poppins_Bold',
    textTransform: 'capitalize',
    color: '#777',
    fontSize: 14,
  },
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

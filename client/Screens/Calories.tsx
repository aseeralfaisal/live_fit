import React, { useEffect, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Header from '../Components/Header'
import SearchRectangle from '../assets/icons/search_rectangle.svg'
import axios from 'axios'
import { GET_CALORIES } from '../Queries/GET_CALORIES'
import { Picker } from '@react-native-picker/picker'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useAppSelector } from '../redux/hooks'
import { useDispatch } from 'react-redux'
import { setNutritionResult } from '../redux/states/nutritionSlice'
import { BASE_URL } from '@env'
import { CalorieResult } from '../Components/popups/CalorieResult'

export default function Calories() {
  const navigation = useNavigation()
  const route = useRoute()
  const dispatch = useDispatch()
  const [foodSeachVal, setFoodSeachVal] = React.useState('')
  const [inputBorderColor, setInputBorderColor] = React.useState('#ccc')
  const [servingSize, setServingSize] = React.useState('100g')
  const [resultPopup, setResultPopup] = useState(false)
  const [resultLoader, setResultLoader] = useState(true)

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
              <Picker.Item label='10 g' value='10g' />
              <Picker.Item label='20 g' value='20g' />
              <Picker.Item label='30 g' value='30g' />
              <Picker.Item label='40 g' value='40g' />
              <Picker.Item label='50 g' value='50g' />
              <Picker.Item label='60 g' value='60g' />
              <Picker.Item label='70 g' value='70g' />
              <Picker.Item label='80 g' value='80g' />
              <Picker.Item label='90 g' value='90g' />
              <Picker.Item label='100 g' value='100g' />
            </Picker>
            <TouchableOpacity onPress={() => navigation.navigate('FoodScan')}>
              <Image
                source={require('../assets/icons/camera.png')}
                style={{ width: 32, height: 32, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
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

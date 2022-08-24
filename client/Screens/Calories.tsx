import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Header from '../Components/Header'
import SearchRectangle from '../assets/icons/search_rectangle.svg'
import axios from 'axios'
import { GET_CALORIES } from '../Queries/GET_CALORIES'
import { Picker } from '@react-native-picker/picker'

export default function Calories() {
  const [foodSeachVal, setFoodSeachVal] = React.useState('')
  const [result, setResult] = React.useState([])
  const [inputBorderColor, setInputBorderColor] = React.useState('#ccc')
  const [servingSize, setServingSize] = React.useState('100g')

  const BASE_URL = 'https://livefitv2.herokuapp.com/graphql'

  const searchMeals = async () => {
    try {
      const res = await axios.post(BASE_URL, {
        query: GET_CALORIES,
        variables: {
          query: `${servingSize} ${foodSeachVal}`,
        },
      })
      setResult(res.data.data.getFoodCalories)
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
            <View style={{ width: 120, height: 55, paddingRight: 70, overflow: 'hidden' }}>
              <Picker
                style={{ color: '#999', fontFamily: 'Poppins' }}
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
            </View>
          </View>
        </View>
        {foodSeachVal !== '' && result.length === 0 && (
          <View style={styles.searchResultParent}>
            <Text style={[styles.nutrientTextTitle, { textAlign: 'center' }]}>No items found!</Text>
          </View>
        )}
        {foodSeachVal === '' && (
          <View style={styles.searchResultParent}>
            <Text style={[styles.nutrientText, { textAlign: 'center' }]}>Search for a food item!</Text>
          </View>
        )}
        <FlatList
          data={result}
          renderItem={({ item, index }: { item: any; index: number }) => {
            return (
              <View style={styles.searchResultParent}>
                <Text style={[styles.nutrientText, { fontSize: 20, textTransform: 'capitalize' }]}>
                  {item.name}
                </Text>
                <View style={styles.nutrientParent}>
                  <Text style={styles.nutrientTextTitle}>Total Calories: </Text>
                  <Text style={styles.nutrientText}>
                    {item.calories} cals ({item.serving_size_g} g)
                  </Text>
                </View>
                <View style={styles.nutrientParent}>
                  <Text style={styles.nutrientTextTitle}>Total Carbohydrates: </Text>
                  <Text style={styles.nutrientText}>{item.carbohydrates_total_g} g</Text>
                </View>
                <View style={styles.nutrientParent}>
                  <Text style={styles.nutrientTextTitle}>Cholestrol: </Text>
                  <Text style={styles.nutrientText}>{item.cholesterol_mg} mg</Text>
                </View>
                <View style={styles.nutrientParent}>
                  <Text style={styles.nutrientTextTitle}>Saturated fat: </Text>
                  <Text style={styles.nutrientText}>{item.fat_saturated_g} g</Text>
                </View>
                <View style={styles.nutrientParent}>
                  <Text style={styles.nutrientTextTitle}>Total fat: </Text>
                  <Text style={styles.nutrientText}>{item.fat_total_g} g</Text>
                </View>
                <View style={styles.nutrientParent}>
                  <Text style={styles.nutrientTextTitle}>Fiber: </Text>
                  <Text style={styles.nutrientText}>{item.fiber_g} g</Text>
                </View>
                <View style={styles.nutrientParent}>
                  <Text style={styles.nutrientTextTitle}>Potassium: </Text>
                  <Text style={styles.nutrientText}>{item.potassium_mg} mg</Text>
                </View>
                <View style={styles.nutrientParent}>
                  <Text style={styles.nutrientTextTitle}>Protein: </Text>
                  <Text style={styles.nutrientText}>{item.protein_g} g</Text>
                </View>
                <View style={styles.nutrientParent}>
                  <Text style={styles.nutrientTextTitle}>Sodium: </Text>
                  <Text style={styles.nutrientText}>{item.sodium_mg} mg</Text>
                </View>
                <View style={styles.nutrientParent}>
                  <Text style={styles.nutrientTextTitle}>Sugar: </Text>
                  <Text style={styles.nutrientText}>{item.sugar_g} g</Text>
                </View>
              </View>
            )
          }}
          keyExtractor={(item, idx) => idx.toString()}
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
  searchResultParent: {
    backgroundColor: '#92A3FD33',
    padding: 22,
    marginHorizontal: 40,
    borderRadius: 12,
    // height: 320
  },
  inputTextField: {
    width: 250,
    fontSize: 14,
    marginHorizontal: 10,
  },
  nutrientParent: {
    flexDirection: 'row',
  },
  nutrientTextTitle: {
    color: '#555',
    fontFamily: 'Poppins',
    fontSize: 14,
    textTransform: 'capitalize',
  },
  nutrientText: {
    color: '#555',
    fontFamily: 'Poppins',
    fontSize: 14,
  },
})

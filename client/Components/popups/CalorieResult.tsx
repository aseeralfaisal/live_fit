import React from 'react'
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useAppSelector } from '../../redux/hooks'
import MainButton from '../MainButton'
import CalsSVG from '../../assets/icons/cals.svg'
import ProteinSVG from '../../assets/icons/protien.svg'
import FatsSVG from '../../assets/icons/fats.svg'
import CarbsSVG from '../../assets/icons/carbs.svg'
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios'
import { GET_CALORIES } from '../../Queries/GET_CALORIES'
import { BASE_URI } from '../../URI'
import { SET_MEALS } from '../../Queries/SET_MEALS'

interface propTypes {
  foodSeachVal: string
  resultPopup: boolean
  setResultPopup: any
  resultLoader: boolean
}

interface propTypes {
  value: string
  title: string
  Icon: Function
}

export const CalorieResult = ({ foodSeachVal, resultPopup, setResultPopup, resultLoader }: propTypes) => {
  const nutritionResult = useAppSelector((state) => state.nutrition.nutritionResult)
  const todaysDate = useAppSelector((state) => state.nutrition.todaysDate)

  const TotalCalories = ({ calories }: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#eee',
          padding: 8,
          borderRadius: 12,
        }}>
        <CalsSVG />
        <Text
          style={[styles.nutrientTextTitle, { marginLeft: 10, fontSize: 16, fontFamily: 'Poppins_Bold' }]}>
          {calories} calories
        </Text>
      </View>
    )
  }

  const MacroNutrient = ({ value, title, Icon }: propTypes) => {
    return (
      <View style={{ marginHorizontal: 5 }}>
        <LinearGradient colors={['#eeeeee', '#eeefff']} style={styles.box}>
          {Icon && <Icon />}
          <Text style={styles.infoValue}>{value} g</Text>
          <Text style={styles.infoTitle}>{title}</Text>
        </LinearGradient>
      </View>
    )
  }
  const reqNutritionResult = nutritionResult.map((item: any) => {
    return {
      food: item.name,
      calories: item.calories,
      carbs: item.carbohydrates_total_g,
      protein: item.protein_g,
      fats: item.fat_total_g,
    }
  })

  const addMealData = async () => {
    try {
      const formattedDate =
        todaysDate && `${todaysDate.getFullYear()}-${todaysDate.getMonth() + 1}-${todaysDate.getDate()}`
      console.log(formattedDate)
      console.log(reqNutritionResult)
      const response = await axios.post(BASE_URI, {
        query: SET_MEALS,
        variables: {
          meal: reqNutritionResult,
          type: 'breakfast',
          date: formattedDate,
        },
      })
      console.log(response.data)
    } catch (err) {
      console.log(err.response.data.errors)
    }
  }

  return (
    <Modal
      transparent
      animationType='fade'
      visible={resultPopup}
      onRequestClose={() => setResultPopup(false)}>
      <Pressable style={styles.backdrop} onPress={() => setResultPopup(false)}>
        <View style={{ marginTop: '10%' }}>
          {foodSeachVal !== '' && nutritionResult.length === 0 && (
            <View style={styles.searchResultParent}>
              <Text style={[styles.nutrientTextTitle, { textAlign: 'center' }]}>No items found!</Text>
            </View>
          )}
          {!resultLoader ? (
            <FlatList
              data={nutritionResult}
              renderItem={({ item, index }: { item: any; index: number }) => {
                return (
                  <View style={styles.searchResultParent}>
                    <View
                      style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <View>
                        <Text style={styles.foodName}>{item.name}</Text>
                        <Text style={[styles.foodName, { marginLeft: 5, marginTop: -14, fontSize: 20 }]}>
                          {item.serving_size_g} gm
                        </Text>
                      </View>
                    </View>
                    <TotalCalories calories={item.calories} />
                    <View style={styles.threeView}>
                      <MacroNutrient value={item.carbohydrates_total_g} title='Carbs' Icon={CarbsSVG} />
                      <MacroNutrient value={item.protein_g} title='Protein' Icon={ProteinSVG} />
                      <MacroNutrient value={item.fat_total_g} title='Protein' Icon={FatsSVG} />
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
                      <Text style={styles.nutrientTextTitle}>Fiber: </Text>
                      <Text style={styles.nutrientText}>{item.fiber_g} g</Text>
                    </View>
                    <View style={styles.nutrientParent}>
                      <Text style={styles.nutrientTextTitle}>Potassium: </Text>
                      <Text style={styles.nutrientText}>{item.potassium_mg} mg</Text>
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
          ) : (
            <View>
              <ActivityIndicator color={'#92A3FD'} size={'large'} />
            </View>
          )}
          <View style={{ marginTop: 30 }}>
            <MainButton title='Add' horizontalMargin={38} onPress={addMealData} />
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  threeView: { marginVertical: 20, flexDirection: 'row', justifyContent: 'center' },
  box: {
    width: 100,
    height: 120,
    backgroundColor: '#ccc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoValue: { color: '#92A3FD', fontFamily: 'Poppins_Bold', fontSize: 18 },
  infoTitle: { fontFamily: 'Poppins', fontSize: 16, color: '#777' },
  foodName: {
    fontSize: 32,
    textTransform: 'capitalize',
    fontFamily: 'Poppins',
    letterSpacing: 3,
    color: '#92A3FD',
  },
  backdrop: {
    backgroundColor: '#fff',
    height: '100%',
  },
  searchResultParent: {
    backgroundColor: '#fff',
    padding: 22,
    marginHorizontal: 14,
    borderRadius: 12,
  },
  nutrientParent: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  nutrientTextTitle: {
    color: '#777',
    fontFamily: 'Poppins_Bold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  nutrientText: {
    color: '#999',
    fontFamily: 'Poppins_Bold',
    fontSize: 16,
  },
})

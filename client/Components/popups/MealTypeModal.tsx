import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../redux/hooks'
import BreakfastSVG from '../../assets/icons/breakfast.svg'
import LunchSVG from '../../assets/icons/lunch.svg'
import SnackSVG from '../../assets/icons/snack.svg'
import DinnerSVG from '../../assets/icons/dinner.svg'
import { SET_MEALS } from '../../Queries/SET_MEALS'
import axios from 'axios'
import { BASE_URI } from '../../URI'
import { useState } from 'react'
import { setResultPopup } from '../../redux/states/nutritionSlice'

type objectsType = {
  title: string
  icon: Object
}
const Wrapper = ({ elements }: any) => {
  return <View style={{ top: '70%', height: '100%', backgroundColor: '#fff' }}>{elements}</View>
}

const MealTypeModal = ({ setMealTypeModal }: any) => {
  const dispatch = useDispatch()
  const nutritionResult = useAppSelector((state) => state.nutrition.nutritionResult)
  const todaysDate = useAppSelector((state) => state.nutrition.todaysDate)
  const [mealType, setMealType] = useState('')

  const mealsData: objectsType[] = [
    { title: 'Breakfast', icon: <BreakfastSVG /> },
    { title: 'Lunch', icon: <LunchSVG /> },
    { title: 'Snack', icon: <SnackSVG /> },
    { title: 'Dinner', icon: <DinnerSVG /> },
  ]

  const reqNutritionResult = nutritionResult.map((item: any) => {
    return {
      food: item.name,
      calories: item.calories,
      carbs: item.carbohydrates_total_g,
      protein: item.protein_g,
      fats: item.fat_total_g,
    }
  })
  const addMealData = async (title: string) => {
    try {
      const formattedDate =`${todaysDate.getFullYear()}-${todaysDate.getMonth() + 1}-${todaysDate.getDate()}`
      const response = await axios.post(BASE_URI, {
        query: SET_MEALS,
        variables: {
          meal: reqNutritionResult,
          type: title.toLowerCase(),
          date: formattedDate,
        },
      })
      if (response.data) {
        setMealTypeModal(false)
        dispatch(setResultPopup(false))
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Modal transparent animationType='slide'>
        <Pressable style={styles.backdrop} onPress={() => setMealTypeModal(false)}>
          <Wrapper
            elements={
              <>
                <Text style={styles.title}>Choose Meal Type</Text>
                <View style={{ marginVertical: 25, alignItems: 'center' }}>
                  <FlatList
                    horizontal
                    data={mealsData}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          style={{ margin: 10, alignItems: 'center' }}
                          onPress={async () => addMealData(item.title)}>
                          <View style={{ width: 65, height: 65 }}>{item.icon}</View>
                          <Text style={[styles.title, { borderBottomWidth: 0 }]}>{item.title}</Text>
                        </TouchableOpacity>
                      )
                    }}
                    keyExtractor={(_, index) => index.toString()}
                  />
                </View>
              </>
            }
          />
        </Pressable>
      </Modal>
    </>
  )
}

export default MealTypeModal

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: '#00000033',
  },
  saveWorkoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#92A3FD',
    marginHorizontal: 40,
    height: 50,
    borderRadius: 20,
  },
  saveWorkoutBtnText: {
    color: '#fff',
    fontFamily: 'Poppins_Bold',
    textAlignVertical: 'center',
    fontSize: 14,
  },
  title: {
    color: '#777',
    fontFamily: 'Poppins_Bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    height: 50,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  workoutNameInput: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    borderWidth: 1,
    backgroundColor: '#F8F9F9',
    borderColor: '#ccc',
    color: '#777',
    marginHorizontal: 40,
    borderRadius: 16,
    height: 50,
  },
})

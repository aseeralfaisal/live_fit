import React from 'react'
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { useAppSelector } from '../../redux/hooks'
import MainButton from '../MainButton'

interface propTypes {
  foodSeachVal: string
  resultPopup: boolean
  setResultPopup: any
  resultLoader: boolean
}
export const CalorieResult = ({ foodSeachVal, resultPopup, setResultPopup, resultLoader }: propTypes) => {
  const nutritionResult = useAppSelector((state) => state.nutrition.nutritionResult)

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
                    <Text style={styles.foodName}>{item.name}</Text>
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
          ) : (
            <View>
              <ActivityIndicator color={'#92A3FD'} size={'large'} />
            </View>
          )}
          <View style={{ marginTop: 30 }}>
            <MainButton title='Add' horizontalMargin={38} onPress={null} />
          </View>
        </View>
      </Pressable>
    </Modal>
  )
}

const styles = StyleSheet.create({
  foodName: {
    fontSize: 30,
    textTransform: 'capitalize',
    fontFamily: 'Poppins',
    letterSpacing: 5,
    color: '#92A3FD',
  },
  backdrop: {
    backgroundColor: '#fff',
    height: '100%',
  },
  searchResultParent: {
    backgroundColor: '#fff',
    padding: 22,
    marginHorizontal: 30,
    borderRadius: 12,
    // height: 320
  },
  nutrientParent: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  nutrientTextTitle: {
    color: '#555',
    fontFamily: 'Poppins',
    fontSize: 18,
    textTransform: 'capitalize',
  },
  nutrientText: {
    color: '#555',
    fontFamily: 'Poppins',
    fontSize: 18,
  },
})

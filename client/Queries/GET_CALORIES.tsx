export const GET_CALORIES = `mutation GetFoodCalories($query: String!) {
  getFoodCalories(query: $query){
    sugar_g
    fiber_g
    serving_size_g
    sodium_mg
    name
    potassium_mg
    fat_saturated_g
    fat_total_g
    calories
    cholesterol_mg
    protein_g
    carbohydrates_total_g
  }
}`

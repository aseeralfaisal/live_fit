export const GET_NUTRION_BY_DATE = `mutation GetNutritionByDate($dateString: String) {
    getNutritionByDate(dateString: $dateString) {
      date
      breakfast {
        food
        carbs
        protein
        fats
        calories
      }
      lunch {
        food
        carbs
        protein
        fats
        calories
      }
      snack {
        food
        carbs
        protein
        fats
        calories
      }
      dinner {
        food
        carbs
        protein
        fats
        calories
      }
      calories
    }
  }
  `
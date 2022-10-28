export const GET_NUTRION_BY_DATE = `mutation GetNutritionByDate($dateString: String) {
    getNutritionByDate(dateString: $dateString) {
      date
      breakfast {
        food
        calories
      }
      lunch {
        food
        calories
      }
      snack {
        food
      }
      dinner {
        food
      }
      calories
    }
  }
  `
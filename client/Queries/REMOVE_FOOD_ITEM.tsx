export const REMOVE_FOOD_ITEM = `mutation RemoveFoodItem($date: String, $food: String, $type: String) {
    removeFoodItem(date: $date, food: $food, type: $type) {
      date
      calories
    }
  }`

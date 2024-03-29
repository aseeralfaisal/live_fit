const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    test: String!
    carbsTotal: String
    proteinTotal: String
    fatsTotal: String
    caloriesTotal: String
    sevenDaysIntake: [sevenDaysIntake]
  }
  type sevenDaysIntake {
    date: String
    calories: Float
  }
  type User {
    user: String!
    calorieGoal: Float
    squat: Float
    bench: Float
    deadlift: Float
    height: Float
    weight: Float
    bodyFat: Float
  }
  type setRepsWeight {
    set: Int
    reps: Int
    weight: Int
    _id: String
  }
  type Exercise {
    equipment: String!
    gifUrl: String!
    id: String!
    name: String!
    target: String!
    sets: [setRepsWeight]
  }
  input WorkoutInput {
    equipment: String!
    gifUrl: String!
    id: String!
    name: String!
    target: String!
  }
  type Workout {
    userName: String!
    workoutName: String!
    exercises: [Exercise!]
  }
  input setRepsWeightinput {
    set: Int
    reps: Int
    weight: Int
    _id: String
  }
  type foodCalorieItems {
    sugar_g: Float
    fiber_g: Float
    serving_size_g: Float
    sodium_mg: Float
    name: String
    potassium_mg: Float
    fat_saturated_g: Float
    fat_total_g: Float
    calories: Float
    cholesterol_mg: Float
    protein_g: Float
    carbohydrates_total_g: Float
  }
  type SpecificMeal {
    food: String
    calories: Float
    carbs: Float
    protein: Float
    fats: Float
  }
  input SpecificMealInput {
    food: String
    calories: Float
    carbs: Float
    protein: Float
    fats: Float
  }
  type Meal {
    date: String
    meal: [SpecificMeal]
  }
  type MealOne {
    date: String
    breakfast: [SpecificMeal]
    userName: String
    lunch: [SpecificMeal]
    snack: [SpecificMeal]
    dinner: [SpecificMeal]
    calories: Float
  }
  type Mutation {
    setMeals(meal: [SpecificMealInput], date: String, type: String, userName: String): [SpecificMeal]
    removeFoodItem(food: String, date: String, type: String): MealOne
    getNutritionByDate(dateString: String, userName: String): MealOne
    changeInfo(type: String, userName: String, value: Float): MealOne
    getUserInfo(user: String): User
    getCaloriesCount(type: String): String
    addUser(name: String!, pass: String!): User!
    loginUser(name: String!, pass: String!): User!
    getExercise(target: String!): [Exercise!]
    createUpdateWorkout(userName: String!, workoutName: String!, exercises: [WorkoutInput]): [Workout]
    getUserWorkouts(userName: String!): [Workout]
    getUserWorkout(userName: String!, workoutName: String!): [Workout]
    addSetsReps(
      userName: String
      workoutName: String
      exerciseName: String
      setsReps: [setRepsWeightinput]
    ): Workout
    deleteSet(workoutName: String!, userName: String!, id: String!): Workout
    updateSet(workoutName: String!, userName: String!, id: String!, reps: Int, weight: Int): Workout
    getFoodCalories(query: String!): [foodCalorieItems]
  }
`
module.exports = typeDefs

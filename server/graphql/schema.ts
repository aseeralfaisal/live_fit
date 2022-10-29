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
    calories: Int
  } 
  type User {
    user: String!
    pass: String!
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
    calories: Int
    carbs: Int
    protein: Int
    fats: Int
  }
  input SpecificMealInput {
    food: String
    calories: Int
    carbs: Int
    protein: Int
    fats: Int
  }
  type Meal {
    date: String
    meal: [SpecificMeal]
  }
  type MealOne {
    date: String
    breakfast: [SpecificMeal]
    lunch: [SpecificMeal]
    snack: [SpecificMeal]
    dinner: [SpecificMeal]
    calories: Int
  }
  type Mutation {
    setMeals(meal: [SpecificMealInput], date: String, type: String): [SpecificMeal]
    getNutritionByDate(dateString: String): MealOne
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

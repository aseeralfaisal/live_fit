"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const Meal = require('../../models/meal');
const { isEqual } = require('date-fns');
const getTotal = (macro) => __awaiter(void 0, void 0, void 0, function* () {
    let sum = 0;
    const getSum = (meal) => meal.forEach(({ carbs, protein, fats, calories }) => {
        switch (macro) {
            case 'carbs':
                sum += carbs;
            case 'protein':
                sum += protein;
            case 'fats':
                sum += fats;
            default:
                sum += calories;
        }
    });
    const date = new Date().toISOString().split('T')[0].toString();
    const mealFound = yield Meal.findOne({ date });
    if (mealFound) {
        const { breakfast, snack, lunch, dinner } = mealFound;
        getSum(breakfast);
        getSum(snack);
        getSum(lunch);
        getSum(dinner);
    }
    return sum.toString();
});
const meals = {
    getFoodCalories(_, { query }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
                    headers: {
                        'X-Api-Key': 'LUqUEvZwtBGEm9YqPvcb5g==rwCrBFMK8LHjYWQI',
                    },
                });
                return res.data.items;
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    setMeals(_, { meal, date, type, userName }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealType = { breakfast: 'breakfast', lunch: 'lunch', snack: 'snack', dinner: 'dinner' };
                const setCalories = () => __awaiter(this, void 0, void 0, function* () {
                    const calories = yield getTotal('calories');
                    return yield Meal.findOneAndUpdate({ date }, { calories });
                });
                const mealFound = yield Meal.findOne({ date, userName });
                let mealFoundType;
                if (mealFound) {
                    meal.forEach((item) => {
                        if (type === mealType.breakfast) {
                            mealFoundType = mealFound.breakfast;
                        }
                        else if (type === mealType.lunch) {
                            mealFoundType = mealFound.lunch;
                        }
                        else if (type === mealType.snack) {
                            mealFoundType = mealFound.snack;
                        }
                        else if (type === mealType.dinner) {
                            mealFoundType = mealFound.dinner;
                        }
                        mealFoundType.push(item);
                    });
                    yield mealFound.save();
                    yield setCalories();
                    return mealFoundType;
                }
                const setMealHelper = (mealType) => (type === mealType ? meal : []);
                const Meals = new Meal({
                    breakfast: setMealHelper(mealType.breakfast),
                    lunch: setMealHelper(mealType.lunch),
                    snack: setMealHelper(mealType.snack),
                    dinner: setMealHelper(mealType.dinner),
                    date,
                    userName,
                });
                yield Meals.save();
                yield setCalories();
                return mealFoundType;
            }
            catch (error) {
                console.log(error);
            }
        });
    },
    getCaloriesCount(_, { type }) {
        return __awaiter(this, void 0, void 0, function* () {
            const mealType = { breakfast: 'breakfast', lunch: 'lunch', snack: 'snack', dinner: 'dinner' };
            const date = new Date().toISOString().split('T')[0];
            const mealFound = yield Meal.findOne({ date: date.toString() });
            let foundMealObj;
            let sum = 0;
            if (mealFound) {
                if (type === mealType.breakfast) {
                    foundMealObj = mealFound.breakfast;
                }
                else if (type === mealType.snack) {
                    foundMealObj = mealFound.snack;
                }
                else if (type === mealType.lunch) {
                    foundMealObj = mealFound.lunch;
                }
                else {
                    foundMealObj = mealFound.dinner;
                }
                foundMealObj.forEach(({ calories }) => {
                    sum += calories;
                });
                return sum.toString();
            }
        });
    },
    getNutritionByDate(_, { dateString, userName }) {
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date(dateString).toISOString().split('T')[0];
            const response = yield Meal.findOne({ date: date, userName: userName });
            return response;
        });
    },
    removeFoodItem(_, { food, date, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundMeal = yield Meal.findOne({ date });
            let foundMealObj;
            switch (type) {
                case 'breakfast':
                    foundMealObj = foundMeal.breakfast;
                    break;
                case 'lunch':
                    foundMealObj = foundMeal.lunch;
                    break;
                case 'dinner':
                    foundMealObj = foundMeal.dinner;
                    break;
                default:
                    foundMealObj = foundMeal.snack;
            }
            if (foundMealObj) {
                const remove = yield foundMealObj.forEach((foodItem) => __awaiter(this, void 0, void 0, function* () {
                    if (foodItem.food === food) {
                        yield foodItem.remove();
                    }
                }));
                const save = yield foundMeal.save();
                if (save) {
                    const calories = yield getTotal('calories');
                    yield foundMeal.updateOne({ calories: calories });
                    return yield foundMeal.save();
                }
            }
        });
    },
};
module.exports = meals;
//# sourceMappingURL=mutation.js.map
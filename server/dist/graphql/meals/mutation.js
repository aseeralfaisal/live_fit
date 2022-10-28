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
    setMeals(_, { meal, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mealType = { breakfast: 'breakfast', lunch: 'lunch', snack: 'snack', dinner: 'dinner' };
                const todaysDateString = new Date().toISOString().split('T')[0];
                const setCalories = () => __awaiter(this, void 0, void 0, function* () {
                    const calories = yield getTotal('calories');
                    const filter = { date: todaysDateString };
                    const update = { calories: calories };
                    return yield Meal.findOneAndUpdate(filter, update);
                });
                const mealFound = yield Meal.findOne({ date: todaysDateString.toString() });
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
                    date: todaysDateString,
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
            let mealObj;
            let sum = 0;
            if (mealFound) {
                if (type === mealType.breakfast) {
                    mealObj = mealFound.breakfast;
                }
                else if (type === mealType.snack) {
                    mealObj = mealFound.snack;
                }
                else if (type === mealType.lunch) {
                    mealObj = mealFound.lunch;
                }
                else {
                    mealObj = mealFound.dinner;
                }
                mealObj.forEach(({ calories }) => {
                    sum += calories;
                });
                return sum.toString();
            }
        });
    },
    getNutritionByDate(_, { date }) {
        return __awaiter(this, void 0, void 0, function* () {
            const DATE = new Date(date).toISOString().split('T')[0];
            const response = yield Meal.findOne({ date: DATE });
            return response;
        });
    },
};
module.exports = meals;
//# sourceMappingURL=mutation.js.map
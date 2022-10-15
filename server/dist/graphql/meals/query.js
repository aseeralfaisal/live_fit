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
const Meal = require('../../models/meal');
const { startOfDay, subDays } = require('date-fns');
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
    carbsTotal: () => __awaiter(void 0, void 0, void 0, function* () { return yield getTotal('carbs'); }),
    proteinTotal: () => __awaiter(void 0, void 0, void 0, function* () { return yield getTotal('protein'); }),
    fatsTotal: () => __awaiter(void 0, void 0, void 0, function* () { return yield getTotal('fats'); }),
    caloriesTotal: () => __awaiter(void 0, void 0, void 0, function* () { return yield getTotal('calories'); }),
    sevenDaysIntake: () => __awaiter(void 0, void 0, void 0, function* () {
        const filter = startOfDay(subDays(new Date(), 6));
        const filtered = yield Meal.find().where('createdAt').gt(filter);
        return filtered;
    }),
};
module.exports = meals;
//# sourceMappingURL=query.js.map
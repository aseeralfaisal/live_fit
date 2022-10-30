"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SpecificMeal = new Schema({
    food: String,
    calories: Number,
    carbs: Number,
    protein: Number,
    fats: Number,
});
const Meal = new Schema({
    date: String,
    calories: Number,
    userName: String,
    breakfast: [SpecificMeal],
    lunch: [SpecificMeal],
    snack: [SpecificMeal],
    dinner: [SpecificMeal],
}, {
    timestamps: true,
});
module.exports = mongoose.model('Meal', Meal);
//# sourceMappingURL=meal.js.map
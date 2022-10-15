"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mealsQuery = require('./meals/query');
const mealsMutaion = require('./meals/mutation');
const userMutation = require('./user/mutation');
const workoutMutation = require('./workout/mutation');
const resolvers = {
    Query: Object.assign({}, mealsQuery),
    Mutation: Object.assign(Object.assign(Object.assign({}, userMutation), workoutMutation), mealsMutaion),
};
module.exports = resolvers;
//# sourceMappingURL=index.js.map
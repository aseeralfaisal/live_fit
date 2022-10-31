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
const exercises = require('../../../Data/exercises.json');
const User = require('../../models/user');
const { ApolloError } = require('apollo-server-express');
const Workouts = require('../../models/workouts');
const workout = {
    getExercise(_, { target }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { chest, back, legs, shoulders, arms } = exercises;
                switch (target) {
                    case 'chest':
                        return chest;
                    case 'back':
                        return back;
                    case 'legs':
                        return legs;
                    case 'shoulders':
                        return shoulders;
                    case 'arms':
                        return arms;
                    default:
                        return null;
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    createUpdateWorkout(_, { userName, workoutName, exercises }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ user: userName });
                if (user) {
                    const workoutFound = yield Workouts.findOne({ workoutName });
                    if (workoutFound) {
                        exercises.forEach((exercise) => {
                            workoutFound.exercises.push(exercise);
                        });
                        const found = yield workoutFound.save();
                        const result = yield Workouts.find({ userName });
                        return result;
                    }
                    else {
                        const workouts = new Workouts({
                            userName,
                            workoutName,
                            exercises,
                        });
                        yield workouts.save();
                        const result = yield Workouts.find({ userName });
                        return result;
                    }
                }
                else {
                    return new ApolloError('User not found');
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    getUserWorkouts(_, { userName }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ user: userName });
                if (!user)
                    return new ApolloError('Invalid User');
                const workoutsFound = yield Workouts.find({ userName });
                return workoutsFound;
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    getUserWorkout(_, { workoutName, userName }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ user: userName });
                if (!user)
                    return new ApolloError('Invalid User');
                const workoutsFound = yield Workouts.find({ workoutName });
                if (workoutsFound)
                    return workoutsFound;
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    addSetsReps(_, { workoutName, userName, exerciseName, setsReps }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ user: userName });
                if (user) {
                    const workoutFound = yield Workouts.findOne({ workoutName });
                    if (workoutFound) {
                        workoutFound.exercises.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                            if (item.name === exerciseName) {
                                setsReps.forEach((elem) => {
                                    item.sets.push(elem);
                                });
                                yield workoutFound.save();
                            }
                        }));
                        return workoutFound;
                    }
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    deleteSet(_, { workoutName, userName, id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ user: userName });
                if (user) {
                    const workoutFound = yield Workouts.findOne({ workoutName });
                    if (!workoutFound)
                        return new ApolloError('Invalid workout name');
                    workoutFound.exercises.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                        item.sets.forEach((set) => __awaiter(this, void 0, void 0, function* () {
                            if (set.id === id) {
                                yield set.remove();
                            }
                        }));
                    }));
                    yield workoutFound.save();
                    return workoutFound;
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    updateSet(_, { workoutName, userName, id, reps, weight }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User.findOne({ user: userName });
                if (user) {
                    const workoutFound = yield Workouts.findOne({ workoutName });
                    if (!workoutFound)
                        return new ApolloError('Invalid workout name');
                    workoutFound.exercises.forEach((item) => __awaiter(this, void 0, void 0, function* () {
                        item.sets.forEach((set) => __awaiter(this, void 0, void 0, function* () {
                            if (set.id === id) {
                                set.$set({
                                    reps,
                                    weight,
                                });
                                // console.log(set)
                            }
                        }));
                    }));
                    yield workoutFound.save();
                    return workoutFound;
                }
            }
            catch (err) {
                console.log(err);
            }
        });
    },
};
module.exports = workout;
//# sourceMappingURL=mutation.js.map
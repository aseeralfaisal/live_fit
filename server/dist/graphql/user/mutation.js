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
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS;
const User = require('../../models/user');
const { ApolloError } = require('apollo-server-express');
const user = {
    addUser(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, pass } = args;
            try {
                const salt = yield bcrypt.genSalt(saltRounds);
                const hash = yield bcrypt.hash(pass, salt);
                const user = new User({
                    user: name,
                    pass: hash,
                });
                const userExists = yield User.findOne({ user: user.user });
                if (!userExists) {
                    yield user.save();
                }
                return user;
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    loginUser(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, pass } = args;
            const userExists = yield User.findOne({ user: name });
            if (userExists) {
                const passCompare = yield bcrypt.compare(pass, userExists.pass);
                if (passCompare) {
                    return userExists;
                }
                else {
                    return new ApolloError('Password do not match');
                }
            }
            else {
                return new ApolloError("User doesn't exist");
            }
        });
    },
    changeInfo(_, { type, userName, value }) {
        return __awaiter(this, void 0, void 0, function* () {
            const infoTypes = {
                calorieGoal: 'calorieGoal',
                squat: 'squat',
                bench: 'bench',
                deadlift: 'deadlift',
                height: 'height',
                weight: 'weight',
                bodyFat: 'bodyFat',
            };
            let filter;
            switch (type) {
                case infoTypes.calorieGoal:
                    filter = { calorieGoal: value };
                    break;
                case infoTypes.squat:
                    filter = { squat: value };
                    break;
                case infoTypes.bench:
                    filter = { bench: value };
                    break;
                case infoTypes.deadlift:
                    filter = { deadlift: value };
                    break;
                case infoTypes.height:
                    filter = { height: value };
                    break;
                case infoTypes.weight:
                    filter = { weight: value };
                    break;
                case infoTypes.bodyFat:
                    filter = { bodyFat: value };
                    break;
            }
            const options = { upsert: true, new: true, setDefaultsOnInsert: true };
            const res = yield User.findOneAndUpdate({ user: userName }, filter, options);
            const save = res.save();
            return save;
        });
    },
    getUserInfo(_, { user }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield User.findOne({ user });
            console.log(response);
            return response;
        });
    },
};
module.exports = user;
//# sourceMappingURL=mutation.js.map
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
};
module.exports = user;
//# sourceMappingURL=mutation.js.map
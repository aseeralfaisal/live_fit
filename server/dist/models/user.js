"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const User = new mongoose.Schema({
    user: String,
    pass: String,
}, { timestamps: true });
module.exports = mongoose.model('User', User);
//# sourceMappingURL=user.js.map
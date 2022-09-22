import mongoose from 'mongoose';
const User = new mongoose.Schema({
    user: String,
    pass: String,
}, { timestamps: true });
export default mongoose.model('User', User);
//# sourceMappingURL=user.js.map
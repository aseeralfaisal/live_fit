import mongoose from 'mongoose';
import exercisesSchema from './exercise';
const Workouts = new mongoose.Schema({
    userName: String,
    workoutName: String,
    exercises: [exercisesSchema],
}, { timestamps: true });
export default mongoose.model('Workouts', Workouts);
//# sourceMappingURL=workouts.js.map
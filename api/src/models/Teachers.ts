import mongoose, { Schema } from 'mongoose';

const TeacherSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: Schema.Types.String
});

export default mongoose.model('Teacher', TeacherSchema, 'Teachers');
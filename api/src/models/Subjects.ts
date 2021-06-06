import mongoose, { Schema } from 'mongoose';

const SubjectSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    name: Schema.Types.String
});

export default mongoose.model('Subject', SubjectSchema, 'Subjects');
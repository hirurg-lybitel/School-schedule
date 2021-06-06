import mongoose, { Schema } from 'mongoose';

const SchedulerSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    date: Schema.Types.Date,
    roomId: { type: Schema.Types.ObjectId, ref: 'Room' },
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
    subjectId: { type: Schema.Types.ObjectId, ref: 'Subject' },
});

export default mongoose.model('Scheduler', SchedulerSchema, "Schedule");
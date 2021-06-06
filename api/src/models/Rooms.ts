import mongoose, { Schema } from 'mongoose';

const RoomSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, auto: true },
    number: Schema.Types.String
});

export default mongoose.model('Room', RoomSchema, 'Rooms');
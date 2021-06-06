import mongoose from 'mongoose';
import config from '../config/env.config';

const connect = () => {
    //mongoose.set('bufferCommands', false);  // для дебага вставки в db
    mongoose.connect(config.MONGO_URL, config.MONGO_CONNECT_CONFIG);
};

export default connect;

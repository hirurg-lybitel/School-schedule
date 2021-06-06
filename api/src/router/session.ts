import session from 'express-session';
import connectMongo from 'connect-mongodb-session';
import config from '../config/env.config';

const MongoStore = connectMongo(session);

const store = new MongoStore(
    {
        uri: config.MONGO_URL,
        databaseName: config.MONGO_DATABASENAME,
        collection: 'mySessions',
        connectionOptions: { autoReconnect: true }
    }
);

export default store;
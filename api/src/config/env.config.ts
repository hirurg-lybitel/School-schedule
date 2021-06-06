export default {
    HOST: '127.0.0.1',
    PORT: 7000,
    //MONGO_URL: 'mongodb://localhost:27017/',
    MONGO_URL: 'mongodb+srv://Admin:Admin@schooldb.tb4sh.mongodb.net/SchoolDB?retryWrites=true&w=majority',
    MONGO_DATABASENAME: 'SchoolDB',
    MONGO_CONNECT_CONFIG: { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }
}
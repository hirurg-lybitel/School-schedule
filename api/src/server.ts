import config from './config/env.config';
import router from './router';
import express from 'express';

//const router = require('./router');

const app = express();

app.use('/', router);

app.listen(config.PORT, config.HOST, function () {
  console.log(`Server listens http://${config.HOST}:${config.PORT}`);
})
//module.exports = app;
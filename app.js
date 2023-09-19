require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const router = require('./routes/index');
const limiter = require('./middlewares/rateLimit');
const handleError = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { URL_DB } = require('./utils/constants');

const { PORT = 3000 } = process.env;

const { DB_CONNECT, DB_DISCONNECT } = require('./utils/messegeConstants');

const app = express();

mongoose
  .connect(URL_DB)
  .then(() => {
    console.log(DB_CONNECT);
  })
  .catch(() => {
    console.log(DB_DISCONNECT);
  });

app.use(express.json());
app.use(cors);
app.use(requestLogger);
app.use(helmet());
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT);

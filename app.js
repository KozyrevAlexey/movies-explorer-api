require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const helmet = require('helmet')
const rateLimiter = require('./middlewares/rateLimiter')
const router = require('./routes');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_DB } = require('./utils/constant');

const app = express();
app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://api.diplom.nomoreparties.co', 'https://api.diplom.nomoreparties.co'],
  credentials: true,
}));

mongoose.connect(MONGO_DB);

app.use(helmet());
app.use(rateLimiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`Слушаю порт ${PORT}`)
});
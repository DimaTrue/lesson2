const express = require('express');

const { PORT } = require('./configs/portConfig');
const { authRouter, userRouter } = require('./routers');
const { sendErrorController } = require('./controllers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter);

app.use('/users', userRouter);

app.use(sendErrorController);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));

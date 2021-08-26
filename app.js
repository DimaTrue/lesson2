const express = require('express');
const mongoose = require('mongoose');

const { PORT } = require('./configs/portConfig');
const { authRouter, userRouter } = require('./routers');
const { sendErrorController } = require('./controllers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const runProject = async () => {
    try {
        const result = await mongoose.connect('mongodb://localhost:27017/usersDbInoxoft',
            { useUnifiedTopology: true, useNewUrlParser: true });
        if (result) {
            // eslint-disable-next-line no-console
            app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log('Failed connection to MongoDb: ', err);
    }
};

app.use('/', authRouter);

app.use('/users', userRouter);

app.use(sendErrorController);

runProject();

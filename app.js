const express = require('express');
const mongoose = require('mongoose');

const ErrorHandler = require('./errors/ErrorHandler');
const { authRouter, userRouter, postRouter } = require('./routers');
const { MONGO_URL, PORT } = require('./configs/portConfig');
const { INTERNAL, NOT_FOUND } = require('./configs/statusCodes.enum');
const {
    FAIL_MONGO, PAGE_NOT_FOUND, SOME_WRONG, SERVER_RUNNING
} = require('./configs/stringConstants');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const runApp = async () => {
    try {
        const result = await mongoose.connect(MONGO_URL,
            { useUnifiedTopology: true, useNewUrlParser: true });

        if (result) {
            // eslint-disable-next-line no-console
            app.listen(PORT, () => console.log(`${SERVER_RUNNING} ${PORT}`));
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(FAIL_MONGO, err);
    }
};

// eslint-disable-next-line no-unused-vars
function _errorHandler(err, req, res, next) {
    res.status(err.status || INTERNAL).json({ message: err.message || SOME_WRONG });
}

app.use('/', authRouter);

app.use('/users', userRouter);

app.use('/posts', postRouter);

app.use(() => { throw new ErrorHandler(NOT_FOUND, PAGE_NOT_FOUND); });

app.use(_errorHandler);

runApp();

const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');

require('dotenv').config();

const ErrorHandler = require('./errors/ErrorHandler');
const { authRouter, userRouter, postRouter } = require('./routers');
const { configs, statusCodes, strings } = require('./configs');
const { createSuperAdminIfNotExist } = require('./utils');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());

const runApp = async () => {
    try {
        const result = await mongoose.connect(configs.MONGO_URL,
            { useUnifiedTopology: true, useNewUrlParser: true });

        if (result) {
            app.listen(configs.PORT, () => {
                // eslint-disable-next-line no-console
                console.log(`${strings.SERVER_RUNNING} ${configs.PORT}`);
                createSuperAdminIfNotExist();
            });
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(strings.FAIL_MONGO, err);
    }
};

// eslint-disable-next-line no-unused-vars
function _errorHandler(err, req, res, next) {
    res.status(err.status || statusCodes.INTERNAL).json({ message: err.message || strings.SOME_WRONG });
}

app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/posts', postRouter);

app.use(() => { throw new ErrorHandler(statusCodes.NOT_FOUND, strings.PAGE_NOT_FOUND); });

app.use(_errorHandler);

runApp();

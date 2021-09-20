const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const ErrorHandler = require('./errors/ErrorHandler');
const { authRouter, userRouter, postRouter } = require('./routers');
const { configs, statusCodes, strings } = require('./configs');
const { createSuperAdminIfNotExist } = require('./utils');
const cronJobs = require('./cron');
const Sentry = require('./logger/Sentry');
const swaggerJson = require('./docs/swagger.json');

const app = express();

app.use(cors({ origin: _configureCors }));
app.use(rateLimit({
    windowMs: configs.RATE_LIMIT_PERIOD,
    max: configs.RATE_LIMIT_MAX_REQUESTS
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressFileUpload());
app.use(helmet());

if (process.env.ENV === 'dev') {
    // eslint-disable-next-line import/no-extraneous-dependencies
    const morgan = require('morgan');

    app.use(morgan('dev'));
}

const runApp = async () => {
    try {
        const result = await mongoose.connect(configs.MONGO_URL,
            { useUnifiedTopology: true, useNewUrlParser: true });

        if (result) {
            app.listen(configs.PORT, () => {
                // eslint-disable-next-line no-console
                console.log(`${strings.SERVER_RUNNING} ${configs.PORT}`);
                createSuperAdminIfNotExist();
                cronJobs();
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

function _configureCors(origin, callback) {
    const whiteList = configs.ALLOWED_ORIGIN.split(';');

    if (!origin) {
        return callback(null, true);
    }

    if (!whiteList.includes(origin)) {
        return callback(new Error(strings.CORS_NOT_ALLOWED), false);
    }

    return callback(null, true);
}

app.use(Sentry.Handlers.requestHandler());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use('/auth', authRouter);

app.use('/users', userRouter);

app.use('/posts', postRouter);

app.use(() => { throw new ErrorHandler(statusCodes.NOT_FOUND, strings.PAGE_NOT_FOUND); });

app.use(Sentry.Handlers.errorHandler({

    shouldHandleError: (error) => error.status === 404 || error.status === 500
}));

app.use(_errorHandler);

runApp();

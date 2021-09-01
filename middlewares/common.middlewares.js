const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST, CONFLICT, NOT_FOUND } = require('../configs/statusCodes.enum');
const { BODY, ENTITY_EXIST, ENTITY_NOT_FOUND } = require('../configs/stringConstants');

const isEntityExistInDB = (model, property, searchIn = BODY, dbField = property) => async (req, res, next) => {
    try {
        const value = req[searchIn][property];

        const entity = await model.findOne({ [dbField]: value });

        req.entity = entity;
        next();
    } catch (err) {
        next(err);
    }
};

const throwErrorIfEntityExist = (code = CONFLICT, errorMessage = ENTITY_EXIST) => (req, res, next) => {
    try {
        const { entity } = req;

        if (entity) {
            throw new ErrorHandler(code, errorMessage);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const throwErrorIfEntityNotExist = (code = NOT_FOUND, errorMessage = ENTITY_NOT_FOUND) => (req, res, next) => {
    try {
        const { entity } = req;

        if (!entity) {
            throw new ErrorHandler(code, errorMessage);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const validateIncomingData = (validator, searchIn = BODY) => (req, res, next) => {
    try {
        const { error } = validator.validate(req[searchIn]);

        if (error) {
            throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    isEntityExistInDB,
    throwErrorIfEntityExist,
    throwErrorIfEntityNotExist,
    validateIncomingData
};

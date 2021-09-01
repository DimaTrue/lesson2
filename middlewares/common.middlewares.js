const ErrorHandler = require('../errors/ErrorHandler');
const { ENTITY_EXIST, ENTITY_NOT_FOUND } = require('../configs/stringConstants');

const isEntityExistInDB = (model, property, searchIn = 'body', dbField = property) => async (req, res, next) => {
    try {
        const value = req[searchIn][property];

        const entity = await model.findOne({ [dbField]: value });

        req.entity = entity;
        next();
    } catch (err) {
        next(err);
    }
};

const throwErrorIfEntityExist = (code = 419, errorMessage = ENTITY_EXIST) => (req, res, next) => {
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

const throwErrorIfEntityNotExist = (code = 404, errorMessage = ENTITY_NOT_FOUND) => (req, res, next) => {
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

module.exports = {
    isEntityExistInDB,
    throwErrorIfEntityExist,
    throwErrorIfEntityNotExist
};

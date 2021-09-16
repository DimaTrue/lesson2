const ErrorHandler = require('../errors/ErrorHandler');
const { strings, statusCodes } = require('../configs');

const isEntityExistInDB = (model, property, searchIn = strings.BODY, dbField = property) => async (req, res, next) => {
    try {
        const value = req[searchIn][property];
        const key = model.collection.modelName;

        const entity = await model.findOne({ [dbField]: value });

        req[key] = entity;
        next();
    } catch (err) {
        next(err);
    }
};

const isEntityExistInDbByOwnerQuery = (
    model, property, searchIn = strings.BODY, dbField = property
) => async (req, res, next) => {
    try {
        const value = req[searchIn][property];
        const key = model.collection.modelName;

        if (!value) {
            next();

            return;
        }

        const entity = await model.findOne({ [dbField]: value });

        if (!entity) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, strings.OWNER_NOT_FOUND);
        }

        req[key] = entity;
        next();
    } catch (err) {
        next(err);
    }
};

const throwErrorIfEntityExist = (model, code = statusCodes.CONFLICT, errorMessage = strings.ENTITY_EXIST) => (req, res, next) => {
    try {
        const key = model.collection.modelName;
        const entity = req[key];

        if (entity) {
            throw new ErrorHandler(code, errorMessage);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const throwErrorIfEntityNotExist = (
    model,
    code = statusCodes.NOT_FOUND,
    errorMessage = strings.ENTITY_NOT_FOUND
) => (req, res, next) => {
    try {
        const key = model.collection.modelName;
        const entity = req[key];

        if (!entity) {
            throw new ErrorHandler(code, errorMessage);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const validateIncomingData = (validator, searchIn = strings.BODY) => (req, res, next) => {
    try {
        const { error } = validator.validate(req[searchIn]);

        if (error) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, error.details[0].message);
        }

        next();
    } catch (err) {
        next(err);
    }
};

const isRoleHasPermission = (rolesList = []) => (req, res, next) => {
    try {
        const { role } = req.currentUser;

        if (!rolesList.includes(role)) {
            throw new ErrorHandler(statusCodes.FORBIDDEN, strings.WRONG_ACCESS);
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    isEntityExistInDB,
    isEntityExistInDbByOwnerQuery,
    isRoleHasPermission,
    throwErrorIfEntityExist,
    throwErrorIfEntityNotExist,
    validateIncomingData
};

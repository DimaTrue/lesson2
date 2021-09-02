const { checkAccessToken, checkRefreshToken } = require('./auth.middlewares');
const {
    isEntityExistInDB,
    throwErrorIfEntityExist,
    throwErrorIfEntityNotExist,
    validateIncomingData
} = require('./common.middlewares');

const { isUserAllowedForAction } = require('./user.middleware');

module.exports = {
    checkAccessToken,
    checkRefreshToken,
    isEntityExistInDB,
    isUserAllowedForAction,
    throwErrorIfEntityExist,
    throwErrorIfEntityNotExist,
    validateIncomingData
};

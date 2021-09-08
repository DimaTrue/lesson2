const {
    checkAccessToken, checkConfirmToken, checkRefreshToken, checkResetToken
} = require('./auth.middlewares');
const {
    isEntityExistInDB,
    isRoleHasPermission,
    throwErrorIfEntityExist,
    throwErrorIfEntityNotExist,
    validateIncomingData
} = require('./common.middlewares');

const { isUserAllowedForAction } = require('./user.middleware');

module.exports = {
    checkAccessToken,
    checkConfirmToken,
    checkRefreshToken,
    checkResetToken,
    isEntityExistInDB,
    isRoleHasPermission,
    isUserAllowedForAction,
    throwErrorIfEntityExist,
    throwErrorIfEntityNotExist,
    validateIncomingData
};

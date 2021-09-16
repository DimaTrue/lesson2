const {
    checkAccessToken, checkConfirmToken, checkRefreshToken, checkResetToken
} = require('./auth.middlewares');
const {
    isEntityExistInDB,
    isEntityExistInDbByOwnerQuery,
    isRoleHasPermission,
    throwErrorIfEntityExist,
    throwErrorIfEntityNotExist,
    validateIncomingData
} = require('./common.middlewares');

const { checkUsersAvatar } = require('./file.middlewares');

const { isUserAllowedForAction } = require('./user.middlewares');

module.exports = {
    checkAccessToken,
    checkConfirmToken,
    checkRefreshToken,
    checkResetToken,
    checkUsersAvatar,
    isEntityExistInDB,
    isEntityExistInDbByOwnerQuery,
    isRoleHasPermission,
    isUserAllowedForAction,
    throwErrorIfEntityExist,
    throwErrorIfEntityNotExist,
    validateIncomingData
};

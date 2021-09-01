const { isValidUserData, isValidLogin } = require('./auth.middlewares');
const { isEntityExistInDB, throwErrorIfEntityExist, throwErrorIfEntityNotExist } = require('./common.middlewares');
const {
    isCorrectPostIdAndUserIdParams, isValidPostData, isValidPostUpdate
} = require('./post.middleware');
const {
    isCorrectUserIdParams, isValidUserUpdateData
} = require('./user.middlewares');

module.exports = {
    isCorrectPostIdAndUserIdParams,
    isCorrectUserIdParams,
    isEntityExistInDB,
    isValidUserData,
    isValidLogin,
    isValidPostData,
    isValidPostUpdate,
    isValidUserUpdateData,
    throwErrorIfEntityExist,
    throwErrorIfEntityNotExist
};

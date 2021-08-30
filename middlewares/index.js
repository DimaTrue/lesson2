const {
    isEmailExist, isValidUserData, isValidLogin, isAccountExist
} = require('./auth.middlewares');
const {
    isCorrectPostIdAndUserIdParams, isPostByIdExist, isValidPostData, isValidPostUpdate
} = require('./post.middleware');
const { isCorrectUserIdParams, isUserByIdExist, isValidUserUpdateData } = require('./user.middlewares');

module.exports = {
    isAccountExist,
    isCorrectPostIdAndUserIdParams,
    isCorrectUserIdParams,
    isEmailExist,
    isPostByIdExist,
    isValidUserData,
    isValidLogin,
    isUserByIdExist,
    isValidPostData,
    isValidPostUpdate,
    isValidUserUpdateData
};

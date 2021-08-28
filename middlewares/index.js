const {
    isEmailExist, isValidUserData, isValidLogin, isAccountExist
} = require('./auth.middlewares');
const { isPostByIdExist, isValidPostData, isValidPostUpdate } = require('./post.middleware');
const { isUserByIdExist, isValidUserUpdateData } = require('./user.middlewares');

module.exports = {
    isAccountExist,
    isEmailExist,
    isPostByIdExist,
    isValidUserData,
    isValidLogin,
    isUserByIdExist,
    isValidPostData,
    isValidPostUpdate,
    isValidUserUpdateData
};

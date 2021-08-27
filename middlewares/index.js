const { isUserByIdExist } = require('./user.middlewares');
const {
    isEmailExist, isValidForm, isValidLogin, isAccountExist
} = require('./auth.middlewares');

module.exports = {
    isAccountExist,
    isEmailExist,
    isValidForm,
    isValidLogin,
    isUserByIdExist
};

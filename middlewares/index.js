const { isUserByIdExist } = require('./user.middlewares');
const { isEmailExist, isValidForm, isValidLogin } = require('./auth.middlewares');

module.exports = {
    isEmailExist,
    isValidForm,
    isValidLogin,
    isUserByIdExist
};

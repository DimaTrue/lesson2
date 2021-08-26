const { getUserController, getUsersListController } = require('./users.controller');
const { signUpController, loginController } = require('./auth.controller');
const { sendErrorController } = require('./error.controller');

module.exports = {
    getUserController,
    getUsersListController,
    signUpController,
    loginController,
    sendErrorController
};

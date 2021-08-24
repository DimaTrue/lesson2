const { getUserController, getUsersListController } = require('./users.controller');
const {
    signUpController, loginController, renderLoginPageController, renderRegisterPageController
} = require('./auth.controller');
const { renderErrorPageController } = require('./error.controller');

module.exports = {
    getUserController,
    getUsersListController,
    signUpController,
    loginController,
    renderLoginPageController,
    renderRegisterPageController,
    renderErrorPageController
};

const {
    getUserController, getUsersListController, deleteUserByIdController, updateUserByIdController
} = require('./users.controller');
const { signUpController, loginController } = require('./auth.controller');

module.exports = {
    deleteUserByIdController,
    getUserController,
    getUsersListController,
    signUpController,
    loginController,
    updateUserByIdController
};

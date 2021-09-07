const {
    deleteUserByIdController,
    getUserController,
    getUsersListController,
    updateUserByIdController
} = require('./users.controller');
const {
    confirmController,
    forgotPasswordController,
    loginController,
    logoutController,
    logoutFromAllDevicesController,
    refreshTokenController,
    resetPasswordController,
    signUpController
} = require('./auth.controller');
const {
    deleteUsersPostByIdController,
    editPostController,
    getAllPostsController,
    getPostsListByUserController,
    createPostController,
    getPostByIdController,
} = require('./posts.controller');

module.exports = {
    confirmController,
    createPostController,
    deleteUserByIdController,
    deleteUsersPostByIdController,
    editPostController,
    forgotPasswordController,
    getAllPostsController,
    getPostByIdController,
    getPostsListByUserController,
    getUserController,
    getUsersListController,
    refreshTokenController,
    resetPasswordController,
    signUpController,
    loginController,
    logoutController,
    logoutFromAllDevicesController,
    updateUserByIdController
};

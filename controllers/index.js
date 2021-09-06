const {
    deleteUserByIdController,
    getUserController,
    getUsersListController,
    updateUserByIdController
} = require('./users.controller');
const {
    confirmController,
    loginController,
    logoutController,
    logoutFromAllDevicesController,
    refreshTokenController,
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
    getAllPostsController,
    getPostByIdController,
    getPostsListByUserController,
    getUserController,
    getUsersListController,
    refreshTokenController,
    signUpController,
    loginController,
    logoutController,
    logoutFromAllDevicesController,
    updateUserByIdController
};

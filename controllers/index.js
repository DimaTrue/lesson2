const {
    deleteUserByIdController,
    getUserController,
    getUsersListController,
    updateUserByIdController
} = require('./users.controller');
const { loginController, signUpController } = require('./auth.controller');
const {
    deleteUsersPostByIdController,
    editPostController,
    getAllPostsController,
    getPostsListByUserController,
    createPostController,
    getPostByIdController,
} = require('./posts.controller');

module.exports = {
    createPostController,
    deleteUserByIdController,
    deleteUsersPostByIdController,
    editPostController,
    getAllPostsController,
    getPostByIdController,
    getPostsListByUserController,
    getUserController,
    getUsersListController,
    signUpController,
    loginController,
    updateUserByIdController
};

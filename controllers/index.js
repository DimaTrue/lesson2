const {
    getUserController, getUsersListController, deleteUserByIdController, updateUserByIdController
} = require('./users.controller');
const { signUpController, loginController } = require('./auth.controller');
const {
    getAllPostsController, getPostsListByUserController, createPostController,
    getPostByIdController,
    deleteUsersPostByIdController,
    editPostController
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

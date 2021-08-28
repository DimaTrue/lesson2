const router = require('express').Router();

const {
    createPostController,
    getAllPostsController,
    getPostsListByUserController,
    getPostByIdController,
    deleteUsersPostByIdController,
    editPostController
} = require('../controllers');
const {
    isPostByIdExist, isValidPostData, isValidPostUpdate, isUserByIdExist
} = require('../middlewares');

router.get('/', getAllPostsController);

router.get('/:post_id', isPostByIdExist, getPostByIdController);

router.get('/by_user/:user_id', isUserByIdExist, getPostsListByUserController);

router.post('/:user_id/create_post', isValidPostData, isUserByIdExist, createPostController);

router.delete('/:user_id/:post_id', isUserByIdExist, isPostByIdExist, deleteUsersPostByIdController);

router.put('/:user_id/:post_id', isValidPostUpdate, isUserByIdExist, isPostByIdExist, editPostController);

module.exports = router;

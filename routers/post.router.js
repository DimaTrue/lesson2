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
    isCorrectPostIdAndUserIdParams,
    isCorrectUserIdParams, isPostByIdExist, isValidPostData, isValidPostUpdate, isUserByIdExist
} = require('../middlewares');

router.get('/', getAllPostsController);

router.get('/:post_id', isPostByIdExist, getPostByIdController);

router.get('/by_user/:user_id', isCorrectUserIdParams, isUserByIdExist, getPostsListByUserController);

router.post('/:user_id/create_post', isCorrectUserIdParams, isValidPostData, isUserByIdExist, createPostController);

router.delete('/:user_id/:post_id',
    isCorrectPostIdAndUserIdParams,
    isUserByIdExist,
    isPostByIdExist,
    deleteUsersPostByIdController);

router.put('/:user_id/:post_id',
    isCorrectPostIdAndUserIdParams,
    isValidPostUpdate,
    isUserByIdExist,
    isPostByIdExist,
    editPostController);

module.exports = router;

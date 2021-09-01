const router = require('express').Router();

const { Post, User } = require('../models');
const { NOT_FOUND } = require('../configs/statusCodes.enum');
const { POST_NOT_FOUND, USER_NOT_FOUND } = require('../configs/stringConstants');
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
    isCorrectUserIdParams,
    isEntityExistInDB,
    isValidPostData,
    isValidPostUpdate,
    throwErrorIfEntityNotExist
} = require('../middlewares');

router.get('/', getAllPostsController);

router.get('/:post_id',
    isEntityExistInDB(Post, 'post_id', 'params', '_id'),
    throwErrorIfEntityNotExist(NOT_FOUND, POST_NOT_FOUND),
    getPostByIdController);

router.get('/by_user/:user_id',
    isCorrectUserIdParams,
    isEntityExistInDB(User, 'user_id', 'params', '_id'),
    throwErrorIfEntityNotExist(NOT_FOUND, USER_NOT_FOUND),
    getPostsListByUserController);

router.post('/:user_id/create_post',
    isCorrectUserIdParams,
    isValidPostData,
    isEntityExistInDB(User, 'user_id', 'params', '_id'),
    throwErrorIfEntityNotExist(NOT_FOUND, USER_NOT_FOUND),
    createPostController);

router.delete('/:user_id/:post_id',
    isCorrectPostIdAndUserIdParams,
    isEntityExistInDB(User, 'user_id', 'params', '_id'),
    throwErrorIfEntityNotExist(NOT_FOUND, USER_NOT_FOUND),
    isEntityExistInDB(Post, 'post_id', 'params', '_id'),
    throwErrorIfEntityNotExist(NOT_FOUND, POST_NOT_FOUND),
    deleteUsersPostByIdController);

router.put('/:user_id/:post_id',
    isCorrectPostIdAndUserIdParams,
    isValidPostUpdate,
    isEntityExistInDB(User, 'user_id', 'params', '_id'),
    throwErrorIfEntityNotExist(NOT_FOUND, USER_NOT_FOUND),
    isEntityExistInDB(Post, 'post_id', 'params', '_id'),
    throwErrorIfEntityNotExist(NOT_FOUND, POST_NOT_FOUND),
    editPostController);

module.exports = router;

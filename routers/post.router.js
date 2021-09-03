const router = require('express').Router();

const { Post, User } = require('../models');
const { NOT_FOUND } = require('../configs/statusCodes.enum');
const {
    _ID, PARAMS, POST_ID, POST_NOT_FOUND, USER_ID, USER_NOT_FOUND
} = require('../configs/stringConstants');
const {
    createPostController,
    getAllPostsController,
    getPostsListByUserController,
    getPostByIdController,
    deleteUsersPostByIdController,
    editPostController
} = require('../controllers');
const {
    isEntityExistInDB, throwErrorIfEntityNotExist, validateIncomingData, checkAccessToken, isUserAllowedForAction,
} = require('../middlewares');
const {
    createPostValidator, updatePostValidator, userIdAndPostIdValidator, postIdParamsValidator, userIdParamsValidator
} = require('../validators');

router.get('/', getAllPostsController);

router.get('/:post_id',
    validateIncomingData(postIdParamsValidator, PARAMS),
    isEntityExistInDB(Post, POST_ID, PARAMS, _ID),
    throwErrorIfEntityNotExist(Post, NOT_FOUND, POST_NOT_FOUND),
    getPostByIdController);

router.get('/by_user/:user_id',
    validateIncomingData(userIdParamsValidator, PARAMS),
    isEntityExistInDB(User, USER_ID, PARAMS, _ID),
    throwErrorIfEntityNotExist(User, NOT_FOUND, USER_NOT_FOUND),
    getPostsListByUserController);

router.post('/:user_id/create_post',
    validateIncomingData(userIdParamsValidator, PARAMS),
    validateIncomingData(createPostValidator),
    checkAccessToken,
    isUserAllowedForAction,
    isEntityExistInDB(User, USER_ID, PARAMS, _ID),
    throwErrorIfEntityNotExist(User, NOT_FOUND, USER_NOT_FOUND),
    createPostController);

router.use('/:user_id/:post_id',
    validateIncomingData(userIdAndPostIdValidator, PARAMS),
    checkAccessToken,
    isUserAllowedForAction);

router.delete('/:user_id/:post_id',
    isEntityExistInDB(User, USER_ID, PARAMS, _ID),
    throwErrorIfEntityNotExist(User, NOT_FOUND, USER_NOT_FOUND),
    isEntityExistInDB(Post, POST_ID, PARAMS, _ID),
    throwErrorIfEntityNotExist(Post, NOT_FOUND, POST_NOT_FOUND),
    deleteUsersPostByIdController);

router.put('/:user_id/:post_id',
    validateIncomingData(updatePostValidator),
    isEntityExistInDB(User, USER_ID, PARAMS, _ID),
    throwErrorIfEntityNotExist(User, NOT_FOUND, USER_NOT_FOUND),
    isEntityExistInDB(Post, POST_ID, PARAMS, _ID),
    throwErrorIfEntityNotExist(Post, NOT_FOUND, POST_NOT_FOUND),
    editPostController);

module.exports = router;

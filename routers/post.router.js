const router = require('express').Router();

const { Post, User } = require('../models');
const { statusCodes, strings } = require('../configs');
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
    createPostValidator,
    getPostsQueryValidator,
    getPostsByUserQueryValidator,
    updatePostValidator,
    userIdAndPostIdValidator,
    postIdParamsValidator,
    userIdParamsValidator
} = require('../validators');

router.get('/',
    validateIncomingData(getPostsQueryValidator, strings.QUERY),
    getAllPostsController);

router.get('/:post_id',
    validateIncomingData(postIdParamsValidator, strings.PARAMS),
    isEntityExistInDB(Post, strings.POST_ID, strings.PARAMS, strings._ID),
    throwErrorIfEntityNotExist(Post, statusCodes.NOT_FOUND, strings.POST_NOT_FOUND),
    getPostByIdController);

router.get('/by_user/:user_id',
    validateIncomingData(getPostsByUserQueryValidator, strings.QUERY),
    validateIncomingData(userIdParamsValidator, strings.PARAMS),
    isEntityExistInDB(User, strings.USER_ID, strings.PARAMS, strings._ID),
    throwErrorIfEntityNotExist(User, statusCodes.NOT_FOUND, strings.USER_NOT_FOUND),
    getPostsListByUserController);

router.post('/:user_id/create_post',
    validateIncomingData(userIdParamsValidator, strings.PARAMS),
    validateIncomingData(createPostValidator),
    checkAccessToken,
    isUserAllowedForAction,
    isEntityExistInDB(User, strings.USER_ID, strings.PARAMS, strings._ID),
    throwErrorIfEntityNotExist(User, statusCodes.NOT_FOUND, strings.USER_NOT_FOUND),
    createPostController);

router.use('/:user_id/:post_id',
    validateIncomingData(userIdAndPostIdValidator, strings.PARAMS),
    checkAccessToken,
    isUserAllowedForAction);

router.delete('/:user_id/:post_id',
    isEntityExistInDB(User, strings.USER_ID, strings.PARAMS, strings._ID),
    throwErrorIfEntityNotExist(User, statusCodes.NOT_FOUND, strings.USER_NOT_FOUND),
    isEntityExistInDB(Post, strings.POST_ID, strings.PARAMS, strings._ID),
    throwErrorIfEntityNotExist(Post, statusCodes.NOT_FOUND, strings.POST_NOT_FOUND),
    deleteUsersPostByIdController);

router.put('/:user_id/:post_id',
    validateIncomingData(updatePostValidator),
    isEntityExistInDB(User, strings.USER_ID, strings.PARAMS, strings._ID),
    throwErrorIfEntityNotExist(User, statusCodes.NOT_FOUND, strings.USER_NOT_FOUND),
    isEntityExistInDB(Post, strings.POST_ID, strings.PARAMS, strings._ID),
    throwErrorIfEntityNotExist(Post, statusCodes.NOT_FOUND, strings.POST_NOT_FOUND),
    editPostController);

module.exports = router;

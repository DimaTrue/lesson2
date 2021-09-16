const router = require('express').Router();

const { Post, User } = require('../models');
const { statusCodes, strings } = require('../configs');
const {
    createPostController,
    getAllPostsController,
    getPostByIdController,
    deleteUsersPostByIdController,
    editPostController
} = require('../controllers');
const {
    isEntityExistInDB,
    isEntityExistInDbByOwnerQuery,
    throwErrorIfEntityNotExist,
    validateIncomingData,
    checkAccessToken,
    isUserAllowedForAction,
} = require('../middlewares');
const {
    createPostValidator,
    getPostsQueryValidator,
    updatePostValidator,
    userIdAndPostIdValidator,
    postIdParamsValidator,
    userIdParamsValidator
} = require('../validators');

router.get('/',
    validateIncomingData(getPostsQueryValidator, strings.QUERY),
    isEntityExistInDbByOwnerQuery(User, strings.OWNER, strings.QUERY, strings._ID),
    getAllPostsController);

router.get('/:post_id',
    validateIncomingData(postIdParamsValidator, strings.PARAMS),
    isEntityExistInDB(Post, strings.POST_ID, strings.PARAMS, strings._ID),
    throwErrorIfEntityNotExist(Post, statusCodes.NOT_FOUND, strings.POST_NOT_FOUND),
    getPostByIdController);

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

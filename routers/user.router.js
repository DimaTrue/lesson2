const router = require('express').Router();

const { User } = require('../models');
const { statusCodes, strings } = require('../configs');
const { getUsersQueryValidator, updateUserValidator, userIdParamsValidator } = require('../validators');
const {
    deleteUserByIdController, getUsersListController, getUserController, updateUserByIdController
} = require('../controllers');
const {
    checkAccessToken, isEntityExistInDB, isUserAllowedForAction, throwErrorIfEntityNotExist, validateIncomingData
} = require('../middlewares');

router.get('/', validateIncomingData(getUsersQueryValidator, strings.QUERY), getUsersListController);

router.put('/:user_id',
    validateIncomingData(userIdParamsValidator, strings.PARAMS),
    validateIncomingData(updateUserValidator),
    checkAccessToken,
    isUserAllowedForAction,
    isEntityExistInDB(User, strings.USER_ID, strings.PARAMS, strings._ID),
    throwErrorIfEntityNotExist(User, statusCodes.NOT_FOUND, strings.USER_NOT_FOUND),
    updateUserByIdController);

router.use('/:user_id',
    validateIncomingData(userIdParamsValidator, strings.PARAMS),
    checkAccessToken,
    isUserAllowedForAction,
    isEntityExistInDB(User, strings.USER_ID, strings.PARAMS, strings._ID),
    throwErrorIfEntityNotExist(User, statusCodes.NOT_FOUND, strings.USER_NOT_FOUND),);

router.get('/:user_id', getUserController);

router.delete('/:user_id', deleteUserByIdController);

module.exports = router;

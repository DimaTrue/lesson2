const router = require('express').Router();

const { User } = require('../models');
const { NOT_FOUND } = require('../configs/statusCodes.enum');
const {
    _ID, PARAMS, USER_ID, USER_NOT_FOUND
} = require('../configs/stringConstants');
const { updateUserValidator, userIdParamsValidator } = require('../validators');
const {
    deleteUserByIdController, getUsersListController, getUserController, updateUserByIdController
} = require('../controllers');
const {
    checkAccessToken, isEntityExistInDB, isUserAllowedForAction, throwErrorIfEntityNotExist, validateIncomingData
} = require('../middlewares');

router.get('/', getUsersListController);

router.put('/:user_id',
    validateIncomingData(userIdParamsValidator, PARAMS),
    validateIncomingData(updateUserValidator),
    checkAccessToken,
    isUserAllowedForAction,
    isEntityExistInDB(User, USER_ID, PARAMS, _ID),
    throwErrorIfEntityNotExist(NOT_FOUND, USER_NOT_FOUND),
    updateUserByIdController);

router.use('/:user_id',
    validateIncomingData(userIdParamsValidator, PARAMS),
    checkAccessToken,
    isUserAllowedForAction,
    isEntityExistInDB(User, USER_ID, PARAMS, _ID),
    throwErrorIfEntityNotExist(NOT_FOUND, USER_NOT_FOUND),);

router.get('/:user_id', getUserController);

router.delete('/:user_id', deleteUserByIdController);

module.exports = router;

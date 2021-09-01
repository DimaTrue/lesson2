const router = require('express').Router();

const { User } = require('../models');
const { NOT_FOUND } = require('../configs/statusCodes.enum');
const { USER_NOT_FOUND } = require('../configs/stringConstants');

const {
    deleteUserByIdController, getUsersListController, getUserController, updateUserByIdController
} = require('../controllers');
const {
    isCorrectUserIdParams, isEntityExistInDB, isValidUserUpdateData, throwErrorIfEntityNotExist
} = require('../middlewares');

router.get('/', getUsersListController);

router.get('/:user_id',
    isCorrectUserIdParams,
    isEntityExistInDB(User, 'user_id', 'params', '_id'),
    throwErrorIfEntityNotExist(NOT_FOUND, USER_NOT_FOUND),
    getUserController);

router.delete('/:user_id',
    isCorrectUserIdParams,
    isEntityExistInDB(User, 'user_id', 'params', '_id'),
    throwErrorIfEntityNotExist(NOT_FOUND, USER_NOT_FOUND),
    deleteUserByIdController);

router.put('/:user_id',
    isCorrectUserIdParams,
    isValidUserUpdateData,
    isEntityExistInDB(User, 'user_id', 'params', '_id'),
    throwErrorIfEntityNotExist(NOT_FOUND, USER_NOT_FOUND),
    updateUserByIdController);

module.exports = router;

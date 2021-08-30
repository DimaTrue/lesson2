const router = require('express').Router();

const {
    deleteUserByIdController, getUsersListController, getUserController, updateUserByIdController
} = require('../controllers');
const { isCorrectUserIdParams, isUserByIdExist, isValidUserUpdateData } = require('../middlewares');

router.get('/', getUsersListController);

router.get('/:user_id', isCorrectUserIdParams, isUserByIdExist, getUserController);

router.delete('/:user_id', isCorrectUserIdParams, isUserByIdExist, deleteUserByIdController);

router.put('/:user_id', isCorrectUserIdParams, isValidUserUpdateData, isUserByIdExist, updateUserByIdController);

module.exports = router;

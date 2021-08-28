const router = require('express').Router();

const {
    deleteUserByIdController, getUsersListController, getUserController, updateUserByIdController
} = require('../controllers');
const { isUserByIdExist, isValidUserUpdateData } = require('../middlewares');

router.get('/', getUsersListController);

router.get('/:user_id', isUserByIdExist, getUserController);

router.delete('/:user_id', isUserByIdExist, deleteUserByIdController);

router.put('/:user_id', isValidUserUpdateData, isUserByIdExist, updateUserByIdController);

module.exports = router;

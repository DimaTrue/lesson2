const router = require('express').Router();

const {
    deleteUserByIdController, getUsersListController, getUserController, updateUserByIdController
} = require('../controllers');
const { isUserByIdExist, isValidForm } = require('../middlewares');

router.get('/', getUsersListController);

router.get('/:user_id', isUserByIdExist, getUserController);

router.delete('/:user_id', isUserByIdExist, deleteUserByIdController);

router.put('/:user_id', isValidForm, isUserByIdExist, updateUserByIdController);

module.exports = router;

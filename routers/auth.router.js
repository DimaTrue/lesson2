const router = require('express').Router();

const { loginController, signUpController } = require('../controllers');
const { isEmailExist, isValidForm, isValidLogin } = require('../middlewares');

router.post('/auth', isValidLogin, loginController);

router.post('/signup', isValidForm, isEmailExist, signUpController);

module.exports = router;

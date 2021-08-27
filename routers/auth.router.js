const router = require('express').Router();

const { loginController, signUpController } = require('../controllers');
const {
    isAccountExist, isEmailExist, isValidForm, isValidLogin
} = require('../middlewares');

router.post('/auth', isAccountExist, isValidLogin, loginController);

router.post('/signup', isValidForm, isEmailExist, signUpController);

module.exports = router;

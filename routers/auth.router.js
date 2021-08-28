const router = require('express').Router();

const { loginController, signUpController } = require('../controllers');
const {
    isAccountExist, isEmailExist, isValidUserData, isValidLogin
} = require('../middlewares');

router.post('/auth', isValidLogin, isAccountExist, loginController);

router.post('/signup', isValidUserData, isEmailExist, signUpController);

module.exports = router;

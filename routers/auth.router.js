const router = require('express').Router();

const {
    renderLoginPageController, renderRegisterPageController, loginController, signUpController
} = require('../controllers');

router.get('/login', renderLoginPageController);

router.get('/register', renderRegisterPageController);

router.post('/auth', loginController);

router.post('/signup', signUpController);

module.exports = router;

const router = require('express').Router();

const { loginController, signUpController } = require('../controllers');

router.post('/auth', loginController);

router.post('/signup', signUpController);

module.exports = router;

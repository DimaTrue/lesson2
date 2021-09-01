const router = require('express').Router();

const { User } = require('../models');
const { EMAIL_ALREADY_EXIST, WRONG_LOGIN } = require('../configs/stringConstants');
const { BAD_REQUEST, CONFLICT } = require('../configs/statusCodes.enum');

const { loginController, signUpController } = require('../controllers');
const {
    isEntityExistInDB, isValidUserData, isValidLogin, throwErrorIfEntityExist, throwErrorIfEntityNotExist
} = require('../middlewares');

router.post('/auth',
    isValidLogin,
    isEntityExistInDB(User, 'email', 'body'),
    throwErrorIfEntityNotExist(BAD_REQUEST, WRONG_LOGIN),
    loginController);

router.post('/signup',
    isValidUserData,
    isEntityExistInDB(User, 'email', 'body'),
    throwErrorIfEntityExist(CONFLICT, EMAIL_ALREADY_EXIST),
    signUpController);

module.exports = router;

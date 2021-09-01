const router = require('express').Router();

const { User } = require('../models');
const { EMAIL, EMAIL_ALREADY_EXIST, WRONG_LOGIN } = require('../configs/stringConstants');
const { BAD_REQUEST, CONFLICT } = require('../configs/statusCodes.enum');
const { loginValidator, signupValidator, } = require('../validators');

const { loginController, signUpController } = require('../controllers');
const {
    isEntityExistInDB, throwErrorIfEntityExist, throwErrorIfEntityNotExist, validateIncomingData
} = require('../middlewares');

router.post('/auth',
    validateIncomingData(loginValidator),
    isEntityExistInDB(User, EMAIL),
    throwErrorIfEntityNotExist(BAD_REQUEST, WRONG_LOGIN),
    loginController);

router.post('/signup',
    validateIncomingData(signupValidator),
    isEntityExistInDB(User, EMAIL),
    throwErrorIfEntityExist(CONFLICT, EMAIL_ALREADY_EXIST),
    signUpController);

module.exports = router;

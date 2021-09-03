const router = require('express').Router();

const { User } = require('../models');
const { EMAIL, EMAIL_ALREADY_EXIST, WRONG_LOGIN } = require('../configs/stringConstants');
const { BAD_REQUEST, CONFLICT } = require('../configs/statusCodes.enum');
const { loginValidator, signupValidator, } = require('../validators');
const {
    loginController, logoutController, logoutFromAllDevicesController, refreshTokenController, signUpController
} = require('../controllers');
const {
    checkAccessToken,
    checkRefreshToken,
    isEntityExistInDB,
    throwErrorIfEntityExist,
    throwErrorIfEntityNotExist,
    validateIncomingData
} = require('../middlewares');

router.post('/login',
    validateIncomingData(loginValidator),
    isEntityExistInDB(User, EMAIL),
    throwErrorIfEntityNotExist(User, BAD_REQUEST, WRONG_LOGIN),
    loginController);

router.post('/logout', checkAccessToken, logoutController);

router.post('/full_logout', checkAccessToken, logoutFromAllDevicesController);

router.post('/token', checkRefreshToken, refreshTokenController);

router.post('/signup',
    validateIncomingData(signupValidator),
    isEntityExistInDB(User, EMAIL),
    throwErrorIfEntityExist(User, CONFLICT, EMAIL_ALREADY_EXIST),
    signUpController);

module.exports = router;

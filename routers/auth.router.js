const router = require('express').Router();

const { User } = require('../models');
const {
    EMAIL, EMAIL_ALREADY_EXIST, QUERY, WRONG_LOGIN, WRONG_DATA
} = require('../configs/stringConstants');
const { BAD_REQUEST, CONFLICT } = require('../configs/statusCodes.enum');
const {
    confirmValidator, forgotValidator, loginValidator, resetValidatorBody, resetValidatorQuery, signupValidator,
} = require('../validators');
const {
    confirmController,
    forgotPasswordController,
    loginController,
    logoutController,
    logoutFromAllDevicesController,
    refreshTokenController,
    resetPasswordController,
    signUpController
} = require('../controllers');
const {
    checkAccessToken,
    checkConfirmToken,
    checkRefreshToken,
    checkResetToken,
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

router.get('/confirm',
    validateIncomingData(confirmValidator, QUERY),
    checkConfirmToken,
    confirmController);

router.post('/forgot_password',
    validateIncomingData(forgotValidator),
    isEntityExistInDB(User, EMAIL),
    throwErrorIfEntityNotExist(User, BAD_REQUEST, WRONG_DATA),
    forgotPasswordController);

router.post('/reset_password',
    validateIncomingData(resetValidatorQuery, QUERY),
    validateIncomingData(resetValidatorBody),
    checkResetToken,
    resetPasswordController);

module.exports = router;

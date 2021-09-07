const router = require('express').Router();

const { User } = require('../models');
const { statusCodes, strings } = require('../configs');
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
    isEntityExistInDB(User, strings.EMAIL),
    throwErrorIfEntityNotExist(User, statusCodes.BAD_REQUEST, strings.WRONG_LOGIN),
    loginController);

router.post('/logout', checkAccessToken, logoutController);

router.post('/full_logout', checkAccessToken, logoutFromAllDevicesController);

router.post('/token', checkRefreshToken, refreshTokenController);

router.post('/signup',
    validateIncomingData(signupValidator),
    isEntityExistInDB(User, strings.EMAIL),
    throwErrorIfEntityExist(User, statusCodes.CONFLICT, strings.EMAIL_ALREADY_EXIST),
    signUpController);

router.get('/confirm',
    validateIncomingData(confirmValidator, strings.QUERY),
    checkConfirmToken,
    confirmController);

router.post('/forgot_password',
    validateIncomingData(forgotValidator),
    isEntityExistInDB(User, strings.EMAIL),
    throwErrorIfEntityNotExist(User, statusCodes.BAD_REQUEST, strings.WRONG_DATA),
    forgotPasswordController);

router.post('/reset_password',
    validateIncomingData(resetValidatorQuery, strings.QUERY),
    validateIncomingData(resetValidatorBody),
    checkResetToken,
    resetPasswordController);

module.exports = router;

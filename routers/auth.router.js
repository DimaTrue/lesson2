const router = require('express').Router();

const { User } = require('../models');
const { roles, statusCodes, strings } = require('../configs');
const {
    confirmValidator, forgotValidator, loginValidator, resetValidatorBody, resetValidatorQuery, signupValidator,
} = require('../validators');
const {
    confirmController,
    createAdmin,
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
    isRoleHasPermission,
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

router.post('/create_admin', checkAccessToken, isRoleHasPermission([roles.SUPER_ADMIN]), createAdmin);

module.exports = router;

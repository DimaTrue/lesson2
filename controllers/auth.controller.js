const ErrorHandler = require('../errors/ErrorHandler');
const { emailService, passwordService, jwtService } = require('../services');
const {
    ConfirmToken, User, OAuth, ResetToken
} = require('../models');
const { userNormalizator, getCurrentYear, uploadImage } = require('../utils');
const {
    configs, emailActions, dbTables: { USER }, constants, roles, strings, statusCodes
} = require('../configs');

const signUpController = async (req, res, next) => {
    try {
        const {
            name, age, email, password, role
        } = req.body;
        const { avatar } = req.files;

        const hashPassword = await passwordService.createHash(password);

        let user = await User.create({
            name, age, email, role, password: hashPassword
        });

        if (avatar) {
            const { _id } = user;

            const uploadImageResult = await uploadImage(avatar, strings.USER, _id);

            user = await User.findByIdAndUpdate(_id, { avatar: uploadImageResult.Location }, { new: true });
        }

        const normalizedUser = userNormalizator(user);

        const confirm_token = jwtService.generateConfirmToken();

        await ConfirmToken.create({
            confirm_token,
            [USER]: user._id
        });

        await emailService.sendMail(
            email,
            emailActions.WELCOME,
            {
                userName: name,
                currentYear: getCurrentYear(),
                frontendUrl: `${configs.FRONTEND_URL}confirm?confirm_token=${confirm_token}`
            }
        );

        res.status(statusCodes.CREATED).json({ user: normalizedUser });
    } catch (err) {
        next(err);
    }
};

const loginController = async (req, res, next) => {
    try {
        const normalizedUser = userNormalizator(req.user);
        const { password } = req.body;
        const { _id, confirmed, password: hashPassword } = req.user;

        if (!confirmed) {
            throw new ErrorHandler(statusCodes.FORBIDDEN, strings.NOT_CONFIRMED);
        }

        const isPasswordCorrect = await passwordService.comparePassword(password, hashPassword);

        if (!isPasswordCorrect) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, strings.WRONG_CREDENTIALS);
        }

        const tokenPair = jwtService.generateTokenPair();

        await OAuth.create({ ...tokenPair, user: _id });

        res.json({ ...tokenPair, user: normalizedUser });
    } catch (err) {
        next(err);
    }
};

const logoutController = async (req, res, next) => {
    try {
        const token = req.get(constants.AUTHORIZATION);

        await OAuth.deleteOne({ access_token: token });

        res.sendStatus(statusCodes.NO_CONTENT);
    } catch (err) {
        next(err);
    }
};

const logoutFromAllDevicesController = async (req, res, next) => {
    try {
        const { currentUser } = req;

        await OAuth.deleteMany({ [USER]: currentUser });

        res.sendStatus(statusCodes.NO_CONTENT);
    } catch (err) {
        next(err);
    }
};

const refreshTokenController = async (req, res, next) => {
    try {
        const token = req.get(constants.AUTHORIZATION);
        const { currentUser } = req;
        const normalizedUser = userNormalizator(currentUser);

        const tokenPair = jwtService.generateTokenPair();

        await OAuth.updateOne(
            { refresh_token: token },
            {
                $set: { ...tokenPair }
            }
        );

        res.json({
            ...tokenPair,
            user: normalizedUser
        });
    } catch (err) {
        next(err);
    }
};

const confirmController = async (req, res, next) => {
    try {
        const user = req.confirmUser;
        user.confirmed = true;

        await user.save();

        await ConfirmToken.deleteMany({ [USER]: user._id });

        res.json({ message: strings.ACCOUNT_CONFIRMED });
    } catch (err) {
        next(err);
    }
};

const forgotPasswordController = async (req, res, next) => {
    try {
        const { _id, email, name } = req.user;

        const reset_token = jwtService.generateResetToken();

        await ResetToken.create({
            reset_token,
            [USER]: _id
        });

        await emailService.sendMail(
            email,
            emailActions.RESET_PASS,
            {
                userName: name,
                currentYear: getCurrentYear(),
                frontendUrl: `${configs.FRONTEND_URL}reset_password?reset_token=${reset_token}`
            }
        );

        res.json({ message: strings.SEND_RESET_TOKEN });
    } catch (err) {
        next(err);
    }
};

const resetPasswordController = async (req, res, next) => {
    try {
        const { new_password } = req.body;
        const user = req.resetPassUser;

        const newPass = await passwordService.createHash(new_password);

        user.password = newPass;

        await user.save();

        await ResetToken.deleteMany({ [USER]: user._id });

        await OAuth.deleteMany({ [USER]: user._id });

        res.json({ message: strings.PASSWORD_CHANGED });
    } catch (err) {
        next(err);
    }
};

const createAdmin = async (req, res, next) => {
    const {
        name, age, email, password
    } = req.body;

    try {
        const hashPassword = await passwordService.createHash(password);

        const admin = await User.create({
            name, age, email, role: roles.ADMIN, password: hashPassword
        });

        const normalizedAdmin = userNormalizator(admin);

        const confirm_token = jwtService.generateConfirmToken();

        await ConfirmToken.create({
            confirm_token,
            [USER]: admin._id
        });

        await emailService.sendMail(
            email,
            emailActions.ADMIN_INVITE,
            {
                userName: name,
                currentYear: getCurrentYear(),
                frontendUrl: `${configs.FRONTEND_URL}confirm_admin?confirm_token=${confirm_token}`
            }
        );
        res.status(statusCodes.CREATED).json({ user: normalizedAdmin });
    } catch (err) {
        next(err);
    }
};

const confirmAdmin = async (req, res, next) => {
    try {
        const { password } = req.body;

        const hashPassword = await passwordService.createHash(password);

        const admin = req.confirmUser;

        admin.confirmed = true;
        admin.password = hashPassword;

        await admin.save();

        await ConfirmToken.deleteMany({ [USER]: admin._id });

        res.json({ message: strings.ACCOUNT_CONFIRMED });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    confirmAdmin,
    confirmController,
    createAdmin,
    forgotPasswordController,
    loginController,
    logoutFromAllDevicesController,
    logoutController,
    refreshTokenController,
    resetPasswordController,
    signUpController
};

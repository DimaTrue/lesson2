const { CREATED, OK } = require('../configs/statusCodes.enum');
const { User } = require('../models');
const { passwordService } = require('../services');
const { userNormalizator } = require('../utils');

module.exports = {

    signUpController: async (req, res, next) => {
        const {
            name, age, email, password
        } = req.body;

        try {
            const hashPassword = await passwordService.createHash(password);

            const user = await User.create({
                name, age, email, password: hashPassword
            });

            const normalizedUser = userNormalizator(user);
            res.status(CREATED).json({ user: normalizedUser });
        } catch (err) {
            next(err);
        }
    },

    loginController: async (req, res, next) => {
        try {
            const normalizedUser = userNormalizator(req.user);

            await passwordService.comparePassword(req.body.password, req.user.password);

            res.status(OK).json({ user: normalizedUser });
        } catch (err) {
            next(err);
        }
    }

};

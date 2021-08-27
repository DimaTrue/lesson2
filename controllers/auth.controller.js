const { CREATED, OK } = require('../configs/statusCodes.enum');
const { ACCOUNT_CREATED } = require('../configs/stringConstants');
const { User } = require('../models');

module.exports = {

    signUpController: async (req, res, next) => {
        const {
            name, age, email, password
        } = req.body;

        try {
            await User.create({
                name, age, email, password
            });

            res.status(CREATED).json({ message: ACCOUNT_CREATED });
        } catch (err) {
            next(err);
        }
    },

    loginController: (req, res, next) => {
        try {
            res.status(OK).redirect('/users');
        } catch (err) {
            next(err);
        }
    }

};

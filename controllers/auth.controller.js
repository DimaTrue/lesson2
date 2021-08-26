const regExpHelper = require('../helpers/stringValidation');
const { sendError } = require('../helpers/sendError');
const {
    BAD_REQUEST,
    CONFLICT,
    INTERNAL,
    CREATED
} = require('../configs/statusCodes.enum');
const {
    EMAIL_ALREADY_EXIST,
    WRONG_LOGIN,
    WRONG_SIGNUP,
    SOME_WRONG,
    ACCOUNT_CREATED
} = require('../configs/stringConstants');
const { User } = require('../model/user.model');

module.exports = {

    signUpController: async (req, res) => {
        const {
            name, age, email, password
        } = req.body;

        try {
            if (regExpHelper.checkIsValidRegister(name, age, email, password)) {
                const isUserExists = await User.findOne({ email });

                if (isUserExists) {
                    sendError(res, CONFLICT, EMAIL_ALREADY_EXIST);

                    return;
                }

                const user = new User({
                    name, age, email, password
                });

                await user.save();

                res.status(CREATED).json(ACCOUNT_CREATED);
            } else {
                sendError(res, BAD_REQUEST, WRONG_SIGNUP);
            }
        } catch (err) {
            sendError(res, INTERNAL, `${SOME_WRONG} ${err.message}`);
        }
    },

    loginController: async (req, res) => {
        const { email, password } = req.body;

        try {
            if (regExpHelper.checkIsValidLogin(email, password)) {
                const user = await User.findOne({ email });

                if (user) {
                    res.redirect('/users');

                    return;
                }
            }

            sendError(res, BAD_REQUEST, WRONG_LOGIN);
        } catch (err) {
            sendError(res, INTERNAL, `${SOME_WRONG} ${err.message}`);
        }
    }

};

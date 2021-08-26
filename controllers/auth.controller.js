const regExpHelper = require('../helpers/stringValidation');
const { addNewUserToJson, getParsedUsers } = require('../services/user.service');
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

module.exports = {

    signUpController: async (req, res) => {
        const {
            name, age, email, password
        } = req.body;

        try {
            if (regExpHelper.checkIsValidRegister(name, age, email, password)) {
                const users = await getParsedUsers();
                const isUserExist = users.find((user) => user.email === email);

                if (isUserExist) {
                    sendError(res, CONFLICT, EMAIL_ALREADY_EXIST);

                    return;
                }

                addNewUserToJson(users, {
                    user_id: users.length + 1,
                    name,
                    age,
                    email,
                    password,
                });

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
                const users = await getParsedUsers();
                const user = users.find(
                    (usersItem) => usersItem.email === email && usersItem.password === password
                );

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

const regExpHelper = require('../helpers/stringValidation');
const { addNewUserToJson, getParsedUsers } = require('../services/user.service');
const { renderErrorPage } = require('../helpers/sendErrorPage');
const { REGISTER, USERS, LOGIN } = require('../configs/routesConstants');
const {
    BAD_REQUEST,
    CONFLICT,
    INTERNAL
} = require('../configs/statusCodes.enum');
const {
    EMAIL_ALREADY_EXIST,
    WRONG_LOGIN,
    WRONG_SIGNUP,
    TO_LOGIN,
    TO_SIGNUP,
    SOME_WRONG
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
                    renderErrorPage(
                        res,
                        CONFLICT,
                        EMAIL_ALREADY_EXIST,
                        LOGIN,
                        TO_LOGIN
                    );

                    return;
                }
                addNewUserToJson(users, {
                    user_id: users.length + 1,
                    name,
                    age,
                    email,
                    password,
                });

                res.redirect(LOGIN);
            } else {
                renderErrorPage(res, BAD_REQUEST, WRONG_SIGNUP, LOGIN, TO_LOGIN);
            }
        } catch (err) {
            renderErrorPage(res, INTERNAL, `${SOME_WRONG} ${err.message}`, LOGIN, TO_LOGIN);
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
                    return res.redirect(USERS);
                }
            }
            renderErrorPage(res, BAD_REQUEST, WRONG_LOGIN, REGISTER, TO_SIGNUP);
        } catch (err) {
            renderErrorPage(res, INTERNAL, `${SOME_WRONG} ${err.message}`, LOGIN, TO_LOGIN);
        }
    },

    renderRegisterPageController: (req, res) => {
        res.render('register');
    },

    renderLoginPageController: (req, res) => {
        res.render('login');
    }

};

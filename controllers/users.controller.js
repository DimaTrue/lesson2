const { renderErrorPage } = require('../helpers/sendErrorPage');
const { getParsedUsers } = require('../services/user.service');
const { USERS, LOGIN } = require('../configs/routesConstants');
const { BAD_REQUEST, INTERNAL } = require('../configs/statusCodes.enum');
const {
    INVALID_ID, TO_USERS, TO_LOGIN, SOME_WRONG
} = require('../configs/stringConstants');

module.exports = {

    getUsersListController: async (req, res) => {
        try {
            const users = await getParsedUsers();
            res.render('users', { users });
        } catch (err) {
            renderErrorPage(res, INTERNAL, `${SOME_WRONG} ${err.message}`, LOGIN, TO_LOGIN);
        }
    },

    getUserController: async (req, res) => {
        const { user_id } = req.params;
        const userIdInt = Number(user_id);

        try {
            const users = await getParsedUsers();
            const user = users.find((item) => item.user_id === userIdInt);
            if (user) {
                res.render('user', { user });
            } else {
                renderErrorPage(res, BAD_REQUEST, INVALID_ID, USERS, TO_USERS);
            }
        } catch (err) {
            renderErrorPage(res, INTERNAL, `${SOME_WRONG} ${err.message}`, LOGIN, TO_LOGIN);
        }
    }

};

const { sendError } = require('../helpers/sendError');
const { getParsedUsers } = require('../services/user.service');
const { BAD_REQUEST, INTERNAL } = require('../configs/statusCodes.enum');
const { INVALID_ID, SOME_WRONG } = require('../configs/stringConstants');

module.exports = {

    getUsersListController: async (req, res) => {
        try {
            const users = await getParsedUsers();
            res.json(users);
        } catch (err) {
            sendError(res, INTERNAL, `${SOME_WRONG} ${err.message}`);
        }
    },

    getUserController: async (req, res) => {
        const { user_id } = req.params;
        const userIdInt = +user_id;

        try {
            const users = await getParsedUsers();
            const user = users.find((item) => item.user_id === userIdInt);

            if (user) {
                res.json(user);

                return;
            }

            sendError(res, BAD_REQUEST, INVALID_ID);
        } catch (err) {
            sendError(res, INTERNAL, `${SOME_WRONG} ${err.message}`);
        }
    }

};

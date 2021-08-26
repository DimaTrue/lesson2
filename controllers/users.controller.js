const { sendError } = require('../helpers/sendError');
const { BAD_REQUEST, INTERNAL } = require('../configs/statusCodes.enum');
const { INVALID_ID, SOME_WRONG } = require('../configs/stringConstants');
const { User } = require('../model/user.model');

module.exports = {

    getUsersListController: async (req, res) => {
        try {
            const users = await User.find({});
            const responseUsersArr = users.map((user) => ({
                name: user.name,
                age: user.age,
                id: user._id
            }));
            res.json(responseUsersArr);
        } catch (err) {
            sendError(res, INTERNAL, `${SOME_WRONG} ${err.message}`);
        }
    },

    getUserController: async (req, res) => {
        const { user_id } = req.params;

        try {
            const user = await User.findOne({ _id: user_id });

            if (user) {
                const responseUser = {
                    name: user.name,
                    age: user.age,
                    id: user._id
                };
                res.json(responseUser);

                return;
            }

            sendError(res, BAD_REQUEST, INVALID_ID);
        } catch (err) {
            sendError(res, INTERNAL, `${SOME_WRONG} ${err.message}`);
        }
    }

};

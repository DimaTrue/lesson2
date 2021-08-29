const { User } = require('../models');
const { OK } = require('../configs/statusCodes.enum');
const { userNormalizator } = require('../utils');

module.exports = {

    getUsersListController: async (req, res, next) => {
        try {
            const users = await User.find({});

            const responseUsersArr = users.map((user) => userNormalizator(user));

            res.status(OK).json({ users: responseUsersArr });
        } catch (err) {
            next(err);
        }
    },

    getUserController: (req, res, next) => {
        try {
            const normalizedUser = userNormalizator(req.user);
            res.status(OK).json({ user: normalizedUser });
        } catch (err) {
            next(err);
        }
    },

    deleteUserByIdController: async (req, res, next) => {
        try {
            await User.deleteOne({ _id: req.user.id });

            const normalizedUser = userNormalizator(req.user);
            res.status(OK).json({ user: normalizedUser });
        } catch (err) {
            next(err);
        }
    },

    updateUserByIdController: async (req, res, next) => {
        try {
            const user = await User.findOneAndUpdate({ _id: req.user.id }, req.body, { new: true });

            const normalizedUser = userNormalizator(user);

            res.status(OK).json({ user: normalizedUser });
        } catch (err) {
            next(err);
        }
    }

};

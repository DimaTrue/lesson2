const { NO_CONTENT } = require('../configs/statusCodes.enum');
const { User } = require('../models');
const { userNormalizator } = require('../utils');

const getUsersListController = async (req, res, next) => {
    try {
        const users = await User.find({});

        const responseUsersArr = users.map((user) => userNormalizator(user));

        res.json({ users: responseUsersArr });
    } catch (err) {
        next(err);
    }
};

const getUserController = (req, res, next) => {
    try {
        const normalizedUser = userNormalizator(req.entity);
        res.json({ user: normalizedUser });
    } catch (err) {
        next(err);
    }
};

const deleteUserByIdController = async (req, res, next) => {
    try {
        await User.deleteOne({ _id: req.entity.id });

        res.sendStatus(NO_CONTENT);
    } catch (err) {
        next(err);
    }
};

const updateUserByIdController = async (req, res, next) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.entity.id }, req.body, { new: true });

        const normalizedUser = userNormalizator(user);

        res.json({ user: normalizedUser });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getUsersListController,
    getUserController,
    deleteUserByIdController,
    updateUserByIdController
};

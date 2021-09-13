const { User, Post, OAuth } = require('../models');
const { userNormalizator } = require('../utils');
const { dbTables: { USER }, statusCodes } = require('../configs');

const getUsersListController = async (req, res, next) => {
    try {
        const { page, perPage } = req.query;

        const users = await User.find().limit(+perPage).skip((page - 1) * perPage);

        const responseUsersArr = users.map((user) => userNormalizator(user));

        res.json({ users: responseUsersArr });
    } catch (err) {
        next(err);
    }
};

const getUserController = (req, res, next) => {
    try {
        const normalizedUser = userNormalizator(req.user);

        res.json({ user: normalizedUser });
    } catch (err) {
        next(err);
    }
};

const deleteUserByIdController = async (req, res, next) => {
    try {
        await User.deleteOne({ _id: req.user.id });

        await Post.deleteMany({ [USER]: req.user });

        await OAuth.deleteMany({ [USER]: req.user });

        res.sendStatus(statusCodes.NO_CONTENT);
    } catch (err) {
        next(err);
    }
};

const updateUserByIdController = async (req, res, next) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.user.id }, req.body, { new: true });

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

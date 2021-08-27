const { User } = require('../models');

module.exports = {

    getUsersListController: async (req, res, next) => {
        try {
            const users = await User.find({});

            const responseUsersArr = users.map((user) => ({
                name: user.name,
                age: user.age,
                id: user._id,
                posts: user.posts
            }));

            res.json({ users: responseUsersArr });
        } catch (err) {
            next(err);
        }
    },

    getUserController: (req, res, next) => {
        try {
            res.json({ user: req.user });
        } catch (err) {
            next(err);
        }
    },

    deleteUserByIdController: async (req, res, next) => {
        try {
            await User.deleteOne({ _id: req.user.id });

            res.json({ user: req.params.user_id });
        } catch (err) {
            next(err);
        }
    },

    updateUserByIdController: async (req, res, next) => {
        try {
            const user = await User.findOneAndUpdate({ _id: req.user.id }, req.body, { new: true });

            res.json({ user });
        } catch (err) {
            next(err);
        }
    }

};

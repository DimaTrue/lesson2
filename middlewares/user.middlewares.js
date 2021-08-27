const ErrorHandler = require('../errors/ErrorHandler');
const { User } = require('../models');

module.exports = {

    isUserByIdExist: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(404, 'User not found');
            }

            req.user = user;

            next();
        } catch (err) {
            next(err);
        }
    },

};

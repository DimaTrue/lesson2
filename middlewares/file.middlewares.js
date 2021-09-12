const ErrorHandler = require('../errors/ErrorHandler');
const { constants, statusCodes, strings } = require('../configs');

const checkUsersAvatar = (req, res, next) => {
    try {
        if (!req.files || !req.files.avatar) {
            next();

            return;
        }

        const { name, size, mimetype } = req.files.avatar;

        if (!constants.PHOTOS_MEMETYPES.includes(mimetype)) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, `${strings.WRONG_FILE_FORMAT} ${name}`);
        }

        if (size > constants.MAX_AVATAR_SIZE) {
            throw new ErrorHandler(statusCodes.BAD_REQUEST, `${name} ${strings.FILE_TOO_BIG}`);
        }

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    checkUsersAvatar
};

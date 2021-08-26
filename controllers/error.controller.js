const { sendError } = require('../helpers/sendError');
const { NOT_FOUND } = require('../configs/statusCodes.enum');
const { PAGE_NOT_FOUND } = require('../configs/stringConstants');

module.exports = {
    sendErrorController: (req, res) => {
        sendError(res, NOT_FOUND, PAGE_NOT_FOUND);
    }
};

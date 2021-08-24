const { renderErrorPage } = require('../helpers/sendErrorPage');
const { LOGIN } = require('../configs/routesConstants');
const { NOT_FOUND } = require('../configs/statusCodes.enum');
const { PAGE_NOT_FOUND, TO_LOGIN } = require('../configs/stringConstants');

module.exports = {
    renderErrorPageController: (req, res) => {
        renderErrorPage(res, NOT_FOUND, PAGE_NOT_FOUND, LOGIN, TO_LOGIN);
    }
};

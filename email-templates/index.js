const { RESET_PASS, WELCOME } = require('../configs/emailActions.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },
    [RESET_PASS]: {
        templateName: 'reset',
        subject: 'Reset password'
    }
};

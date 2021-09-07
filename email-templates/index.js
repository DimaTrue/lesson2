const { emailActions: { RESET_PASS, WELCOME } } = require('../configs');

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

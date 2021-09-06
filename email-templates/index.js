const { GOODBYE, WELCOME } = require('../configs/emailActions.enum');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },
    [GOODBYE]: {
        templateName: 'reset',
        subject: 'Reset password'
    }
};

const { emailActions: { ADMIN_INVITE, RESET_PASS, WELCOME } } = require('../configs');

module.exports = {
    [WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },
    [RESET_PASS]: {
        templateName: 'reset',
        subject: 'Reset password'
    },
    [ADMIN_INVITE]: {
        templateName: 'admin_invite',
        subject: 'Invite to project'
    }
};

const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const { EMAIL_BROADCAST, EMAIL_BROADCAST_PASS } = require('../configs/configs');
const ErrorHandler = require('../errors/ErrorHandler');
const { INTERNAL } = require('../configs/statusCodes.enum');
const { NO_REPLY, WRONG_TEMPLATE } = require('../configs/stringConstants');

const templatesInfo = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_BROADCAST,
        pass: EMAIL_BROADCAST_PASS
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateToSend = templatesInfo[emailAction];

    if (!templateToSend) {
        throw new ErrorHandler(INTERNAL, WRONG_TEMPLATE);
    }

    const { templateName, subject } = templateToSend;

    const html = await templateParser.render(templateName, { ...context });

    return transporter.sendMail({
        from: NO_REPLY,
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};

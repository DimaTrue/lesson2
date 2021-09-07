const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const ErrorHandler = require('../errors/ErrorHandler');
const { configs, statusCodes, strings } = require('../configs');
const templatesInfo = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configs.EMAIL_BROADCAST,
        pass: configs.EMAIL_BROADCAST_PASS
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateToSend = templatesInfo[emailAction];

    if (!templateToSend) {
        throw new ErrorHandler(statusCodes.INTERNAL, strings.WRONG_TEMPLATE);
    }

    const { templateName, subject } = templateToSend;

    const html = await templateParser.render(templateName, { ...context });

    return transporter.sendMail({
        from: strings.NO_REPLY,
        to: userMail,
        subject,
        html
    });
};

module.exports = {
    sendMail
};

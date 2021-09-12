const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

const { ConfirmToken, OAuth, ResetToken } = require('../models');

dayjs.extend(utc);

module.exports = async () => {
    const previousMonth = dayjs.utc().subtract(1, 'month');

    await OAuth.deleteMany({ createdAt: { $lte: previousMonth } });
    await ConfirmToken.deleteMany({ createdAt: { $lte: previousMonth } });
    await ResetToken.deleteMany({ createdAt: { $lte: previousMonth } });
};

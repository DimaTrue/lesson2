module.exports = {
    ACCESS_TOKEN_LIFE: '15m',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '612f7d403c644993af60d1deacc',
    CONFIRM_TOKEN_SECRET: process.env.CONFIRM_TOKEN_SECRET || '613asdas67fab0df72e86f8028c76',
    CONFIRM_TOKEN_LIFE: '2h',
    EMAIL_BROADCAST: process.env.EMAIL_BROADCAST || 'test@email.com',
    EMAIL_BROADCAST_PASS: process.env.EMAIL_BROADCAST_PASS || '12345',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5000/',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/usersDbInoxoft',
    PORT: process.env.PORT || 5000,
    REFRESH_TOKEN_LIFE: '31d',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '612f8e91ef4212bcf103c29bref',
};

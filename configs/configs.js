module.exports = {
    ACCESS: 'access',
    ACCESS_TOKEN_LIFE: '15m',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '612f7d403c644993af60d1deacc',
    REFRESH: 'refresh',
    REFRESH_TOKEN_LIFE: '31d',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '612f8e91ef4212bcf103c29bref',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/usersDbInoxoft',
    PORT: process.env.PORT || 5000,
};

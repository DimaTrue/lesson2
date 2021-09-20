const Sentry = require('@sentry/node');

const { configs: { SENTRY_DSN } } = require('../configs');

Sentry.init({
    dsn: SENTRY_DSN
});

module.exports = Sentry;

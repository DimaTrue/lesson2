module.exports = {
    AGE_REGEXP: /^(?:1[01][0-9]|120|[6-9]|1[0-9]|[2-9][0-9])$/,
    AUTHORIZATION: 'Authorization',
    // eslint-disable-next-line no-useless-escape
    EMAIL_REGEXP: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_REGEXP: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    TEXT_REGEXP: /^[^0-9]\w+$/
};

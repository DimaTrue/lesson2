module.exports = {
    AGE_REGEXP: /^(?:1[01][0-9]|120|[6-9]|1[0-9]|[2-9][0-9])$/,
    AUTHORIZATION: 'Authorization',
    // eslint-disable-next-line no-useless-escape
    EMAIL_REGEXP: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    MAX_AVATAR_SIZE: 5 * 1024 * 1024,
    PASSWORD_REGEXP: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
    PHOTOS_MEMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/png',
        'image/webp'
    ],
    TEXT_REGEXP: /^[^0-9]\w+$/
};

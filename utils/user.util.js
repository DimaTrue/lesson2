/* eslint-disable no-param-reassign */
const userNormalizator = (userToNormalize) => {
    const fieldsToDelete = [
        'password',
        '__v'
    ];
    const userObject = userToNormalize.toObject();

    fieldsToDelete.forEach((field) => {
        // eslint-disable-next-line no-param-reassign
        delete userObject[field];
    });

    return userObject;
};

const nameNormalizator = (name = '') => {
    if (!name) {
        return '';
    }

    // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
    name = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    name = name.replace(/[.,{}<>?$@%+&'":*-]/g, ' ');
    name = name.split(' ').filter((char) => !!char);
    name = name.map((str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase());
    name = name.join(' ').trim();

    return name;
};

module.exports = {
    userNormalizator,
    nameNormalizator
};

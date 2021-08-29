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

module.exports = {
    userNormalizator
};

const { configs, roles, strings } = require('../configs');
const { User } = require('../models');
const { passwordService } = require('../services');

const createSuperAdmin = async () => {
    const {
        SUPER_ADMIN_NAME, SUPER_ADMIN_AGE, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD
    } = configs;

    if (SUPER_ADMIN_NAME && SUPER_ADMIN_AGE && SUPER_ADMIN_EMAIL && SUPER_ADMIN_PASSWORD) {
        const hashPassword = await passwordService.createHash(SUPER_ADMIN_PASSWORD);

        await User.create({
            name: configs.SUPER_ADMIN_NAME,
            age: configs.SUPER_ADMIN_AGE,
            email: configs.SUPER_ADMIN_EMAIL,
            role: roles.SUPER_ADMIN,
            password: hashPassword,
            confirmed: true
        });

        return;
    }
    // eslint-disable-next-line no-console
    console.log(strings.SUPER_ADMIN_UNDEFINED);
};

const createSuperAdminIfNotExist = async () => {
    try {
        const superAdmin = await User.findOne({ role: roles.SUPER_ADMIN });

        if (superAdmin) {
            return;
        }

        await createSuperAdmin();
        // eslint-disable-next-line no-console
        console.log(strings.SUPER_ADMIN_CREATED);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(`${strings.FAIL_CREATE_SUPER_ADMIN} : ${err}`);
    }
};

module.exports = {
    createSuperAdminIfNotExist
};

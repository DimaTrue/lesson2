const { User } = require('../models');

module.exports = {
    findAllUsers: async (query = {}) => {
        const {
            perPage = 20, page = 1, sortBy = 'createdAt', order = 'asc', ...filters
        } = query;
        const skip = (page - 1) * perPage;
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        const filterObject = {};
        const ageFilter = {};

        Object.keys(filters).forEach((key) => {
            switch (key) {
                case 'role':
                    const rolesArr = filters.role.split(';');
                    filterObject.role = { $in: rolesArr };
                    break;

                case 'email':
                    filterObject.email = filters.email;
                    break;

                case 'name':
                    filterObject.name = { $regex: `^${filters.name}.*`, $options: 'gi' };
                    break;

                case 'age.gte':
                    Object.assign(ageFilter, { $gte: +filters['age.gte'] });
                    break;

                case 'age.lte':
                    Object.assign(ageFilter, { $lte: +filters['age.lte'] });
                    break;
            }
        });

        if (Object.keys(ageFilter).length) {
            filterObject.age = ageFilter;
        }

        const users = await User.find(filterObject).limit(+perPage).skip(skip).sort(sort)
            .select('-password -__v');

        const count = await User.countDocuments(filterObject);
        return {
            data: users,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage)

        };
    }
};

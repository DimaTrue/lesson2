const { Post } = require('../models');

module.exports = {
    findAllPosts: async (request) => {
        const { query = {}, user = {} } = request;
        const {
            perPage = 20, page = 1, sortBy = 'createdAt', order = 'asc', ...filters
        } = query;
        const skip = (page - 1) * perPage;
        const orderBy = order === 'asc' ? -1 : 1;
        const sort = { [sortBy]: orderBy };

        const filterObject = {};
        const filtersArray = Object.keys(filters);

        filtersArray.forEach((key) => {
            switch (key) {
                case 'owner':
                    filterObject.user = user._id;
                    break;

                case 'title':
                    filterObject.title = { $regex: `^${filters.title}.*`, $options: 'gi' };
                    break;

                case 'content':
                    filterObject.content = { $regex: `^${filters.content}.*`, $options: 'gi' };
                    break;
            }
        });

        const posts = await Post.find(filterObject).limit(+perPage).skip(skip).sort(sort)
            .select('-__v');

        const count = await Post.countDocuments(filterObject);
        return {
            data: posts,
            page,
            limit: +perPage,
            count,
            pageCount: Math.ceil(count / perPage)

        };
    }
};

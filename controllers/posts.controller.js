const { Post, User } = require('../models');
const { CREATED, OK } = require('../configs/statusCodes.enum');

module.exports = {

    getAllPostsController: async (req, res, next) => {
        try {
            const posts = await Post.find({});

            res.status(OK).json({ posts });
        } catch (err) {
            next(err);
        }
    },

    getPostsListByUserController: async (req, res, next) => {
        try {
            const posts = await Post.find({ owner: req.user._id });

            res.status(OK).json({ posts });
        } catch (err) {
            next(err);
        }
    },

    getPostByIdController: (req, res, next) => {
        try {
            res.status(OK).json({ post: req.post });
        } catch (err) {
            next(err);
        }
    },

    createPostController: async (req, res, next) => {
        try {
            const { title, content } = req.body;

            const post = await Post.create({ title, content, owner: req.user });

            await User.updateOne(
                { _id: req.user.id },
                { $push: { posts: post } },
                { new: true, useFindAndModify: false }
            );

            res.status(CREATED).json({ post });
        } catch (err) {
            next(err);
        }
    },

    deleteUsersPostByIdController: async (req, res, next) => {
        try {
            const { post_id } = req.params;

            const post = await Post.findByIdAndDelete(post_id);

            await User.findOneAndUpdate(
                { _id: req.user.id },
                { $pull: { posts: post._id } },
                { new: true }
            );

            res.status(OK).json({ post: post_id });
        } catch (err) {
            next(err);
        }
    },

    editPostController: async (req, res, next) => {
        try {
            const { post_id } = req.params;

            const updatedPost = await Post.findOneAndUpdate({ _id: post_id }, req.body, { new: true });

            res.status(OK).json({ post: updatedPost });
        } catch (err) {
            next(err);
        }
    },

};

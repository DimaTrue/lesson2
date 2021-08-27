const { Post, User } = require('../models');

module.exports = {

    getAllPostsController: async (req, res, next) => {
        try {
            const posts = await Post.find({});

            res.json({ posts });
        } catch (err) {
            next(err);
        }
    },

    getPostsListByUserController: async (req, res, next) => {
        try {
            const posts = await Post.find({ owner: req.user._id });

            res.json({ posts });
        } catch (err) {
            next(err);
        }
    },

    getPostByIdController: async (req, res, next) => {
        try {
            const { post_id } = req.params;

            const post = await Post.findById(post_id);

            res.json({ post });
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

            res.json({ post });
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

            res.json({ post: post_id });
        } catch (err) {
            next(err);
        }
    },

    editPostController: async (req, res, next) => {
        try {
            const { post_id } = req.params;

            const updatedPost = await Post.findOneAndUpdate({ _id: post_id }, req.body, { new: true });

            res.json({ post: updatedPost });
        } catch (err) {
            next(err);
        }
    },

};

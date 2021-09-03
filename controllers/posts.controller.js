const { CREATED, NO_CONTENT } = require('../configs/statusCodes.enum');
const { USER } = require('../configs/dbTables.enum');
const { Post, User } = require('../models');

const getAllPostsController = async (req, res, next) => {
    try {
        const posts = await Post.find({});

        res.json({ posts });
    } catch (err) {
        next(err);
    }
};

const getPostsListByUserController = async (req, res, next) => {
    try {
        const posts = await Post.find({ [USER]: req.user._id });

        res.json({ posts });
    } catch (err) {
        next(err);
    }
};

const getPostByIdController = (req, res, next) => {
    try {
        res.json({ post: req.post });
    } catch (err) {
        next(err);
    }
};

const createPostController = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const post = await Post.create({ title, content, [USER]: req.user });

        await User.updateOne(
            { _id: req.user.id },
            { $push: { posts: post } },
            { new: true, useFindAndModify: false }
        );

        res.status(CREATED).json({ post });
    } catch (err) {
        next(err);
    }
};

const deleteUsersPostByIdController = async (req, res, next) => {
    try {
        const { post_id, user_id } = req.params;

        const post = await Post.findByIdAndDelete(post_id);

        await User.findOneAndUpdate(
            { _id: user_id },
            { $pull: { posts: post._id } },
            { new: true }
        );

        res.sendStatus(NO_CONTENT);
    } catch (err) {
        next(err);
    }
};

const editPostController = async (req, res, next) => {
    try {
        const { post_id } = req.params;

        const updatedPost = await Post.findOneAndUpdate({ _id: post_id }, req.body, { new: true });

        res.json({ post: updatedPost });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAllPostsController,
    getPostsListByUserController,
    getPostByIdController,
    createPostController,
    deleteUsersPostByIdController,
    editPostController
};

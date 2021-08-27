const router = require('express').Router();

const {
    createPostController,
    getAllPostsController,
    getPostsListByUserController,
    getPostByIdController,
    deleteUsersPostByIdController,
    editPostController
} = require('../controllers');
const { isUserByIdExist } = require('../middlewares');

router.get('/', getAllPostsController);

router.get('/:post_id', getPostByIdController);

router.get('/by_user/:user_id', isUserByIdExist, getPostsListByUserController);

router.post('/:user_id/create_post', isUserByIdExist, createPostController);

router.delete('/:user_id/:post_id', isUserByIdExist, deleteUsersPostByIdController);

router.put('/:user_id/:post_id', isUserByIdExist, editPostController);

module.exports = router;

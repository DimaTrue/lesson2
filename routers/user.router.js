const router = require('express').Router();

const { getUsersListController, getUserController } = require('../controllers/users.controller');

router.get('/', getUsersListController);

router.get('/:user_id', getUserController);

module.exports = router;

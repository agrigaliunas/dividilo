const { Router } = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/:userId',
    UserController.getUserById);

router.delete('/:userId',
    UserController.deleteAccount);

module.exports = router ;

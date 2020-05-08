const express = require('express');

const usersController = require('../../controllers/v1/users-controller');

const router = express.Router();

router.post('/create', usersController.createUser);
router.post('/update', usersController.updateUser);
router.post('/delete', usersController.deleteUser);
router.post('/getAll', usersController.getUsers);

module.exports = router;

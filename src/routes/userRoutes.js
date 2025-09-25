const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');

const userController = new UserController();

router.post('/', (req, res) => userController.createUser(req, res));
router.get('/', (req, res) => userController.getUsers(req, res));
router.get('/:id', (req, res) => userController.getUserById(req, res));
router.put('/:id', (req, res) => userController.updateUser(req, res));
router.delete('/:id', (req, res) => userController.deleteUser(req, res));

module.exports = router;
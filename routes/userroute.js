const express = require('express');
const UserController = require('../controllers/usercontroller');
const authController = require('../controllers/authcontroller');
const Route = express.Router();

Route.get('/',authController.protected, UserController.getAll);
Route.get('/:id', UserController.getById);
Route.post('/', UserController.add);
Route.put('/:id', UserController.update);
Route.delete('/:id', UserController.del);

module.exports = Route;
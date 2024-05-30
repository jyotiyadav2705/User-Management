const route = require('express').Router();

const { getAllUsers, addUser, getUserById, updateUserById, deleteUserById } = require('../controllers/user')
const validationError = require('../middleware/validationError');
const { userValidation, singleUserValidation, updateUserValidation } = require('../validations/user');

//To fetch list of all users
route.get('/users', getAllUsers);

//To create a user
route.post('/users', userValidation, validationError, addUser);

//To fetch single user by id
route.get('/users/:userID', singleUserValidation, validationError, getUserById);

//To update existing user by id
route.put('/users/:userID', updateUserValidation, validationError, updateUserById);

//To delete existing user by id
route.delete('/users/:userID', singleUserValidation, validationError, deleteUserById);


module.exports = route;
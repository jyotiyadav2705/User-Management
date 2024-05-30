const { body, param } = require("express-validator");

//To validate request body while user creation
exports.userValidation = [
    body('name')
        .notEmpty()
        .withMessage('user name is required'),
    body('email')
        .notEmpty()
        .withMessage('user email ID is required')
        .custom(async value => {
            if (value && value.length > 0 && !/[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,3}/.test(value)) {
                return Promise.reject("Invalid email ID");
            }
        }),
]

//To validate request param while fetching single user detail
exports.singleUserValidation = [
    param('userID')
        .notEmpty()
        .withMessage('user ID is required'),
]

//To validate request body while user updation
exports.updateUserValidation = [
    body('name')
        .custom(async (value, { req }) => {
            if (!req.body.email && !value) {
                return Promise.reject('values to be updated are required')
            }
        }),
    body('email')
        .custom(async (value, { req }) => {
            if (!req.body.name && !value) {
                return Promise.reject('values to be updated are required')
            } else
                if (value && value.length > 0 && !/[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]{2,3}/.test(value)) {
                    return Promise.reject("Invalid email ID");
                }

        }),
]
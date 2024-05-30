const models = require('../models')
const Sequelize = models.Sequelize;
const Op = Sequelize.Op;

//Service to get all active users
let getUserDetails = async (userId) => {
    try {
        const userData = await models.user.findOne({ where: { id: userId, isActive: true } });
        if (userData) {
            return {
                error: false,
                statusCode: 200,
                message: 'Success!',
                data: userData
            };
        } else {
            return {
                error: true,
                statusCode: 400,
                message: 'User Not Found!',
                data: []
            };
        }
    }
    catch (error) {
        let data = {
            error: true, statusCode: 400,
            message: error, data: []
        };
        return data;
    }
}

//To get data for report of new users added
let newUserDetails = async () => {
    try {
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // last midnight
        const allUsers = await models.user.findAll({
            order: [['id', 'DESC']],
            where: {
                createdAt: { [Op.gt]: currentDate },
                isActive: true
            }
        });
        if (allUsers) {
            let excelRowsArray = [];
            for (let i = 0; allUsers.length > i; i++) {

                let data = {
                    id: allUsers[i].id,
                    name: allUsers[i].name,
                    email: allUsers[i].email,
                    createdAt: allUsers[i].createdAt
                }
                excelRowsArray.push(data);
            }
            return { excelRowsArray: excelRowsArray };

        } else {
            return {
                error: true,
                statusCode: 400,
                message: 'User Not Found!',
                data: []
            };
        }
    }
    catch (error) {
        let data = {
            error: true, statusCode: 400,
            message: error, data: []
        };
        return data;
    }
}

module.exports = { getUserDetails, newUserDetails }

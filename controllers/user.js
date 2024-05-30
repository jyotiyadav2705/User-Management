const models = require('../models')
const userService = require('../services/user')
const fs = require('fs');
const Excel = require('exceljs');
const { promisify } = require('util');
const mkdirFs = promisify(fs.mkdir);

//To fetch list of all users
exports.getAllUsers = async (req, res, next) => {
    const allUsers = await models.user.findAll({
        order: [['id', 'DESC']]
    });
    if (allUsers.length === 0) {
        return res.status(404).json({
            message: 'Data not Found',
        });
    } else {
        return res.status(200).json({
            message: 'Success',
            data: allUsers,
            count: allUsers.length,
        });
    }
}

//To create a user
exports.addUser = async (req, res, next) => {
    try {
        let { name, email } = req.body;
        const userData = await models.user.findOne({ where: { email: email } });
        let newUser = [];
        if (userData) {
            return res.status(400).json({
                message: 'User exists already!'
            });
        } else {
            newUser = await models.user.create({ email, name });
        }

        return res.status(201).json({
            message: 'User Created Successfully!',
            data: newUser
        });

    } catch (err) {

        return res.status(400).json({
            message: 'Something Went Wrong',
            error: err
        });
    }
}

//To fetch single user by ID
exports.getUserById = async (req, res, next) => {
    try {
        let { userID } = req.params;

        const resp = await userService.getUserDetails(userID);

        return res.status(resp.statusCode).json({
            message: resp.message,
            data: resp.data
        });
    } catch (err) {

        return res.status(400).json({
            message: 'Something Went Wrong',
            error: err
        });
    }
}

//To update details of user by id
exports.updateUserById = async (req, res, next) => {
    try {
        let { name, email } = req.body;
        const resp = await userService.getUserDetails(req.params.userID);

        if (resp.error) {
            return res.status(resp.statusCode).json({
                message: resp.message,
                data: resp.data
            });
        } else {
            let user = resp.data
            const updatedUserData = await models.user.update({
                name: name ?? user.dataValues.name,
                email: email ?? user.dataValues.email
            }, { where: { id: req.params.userID, isActive: true } });

            return res.status(201).json({
                message: 'User Updated Successfully!'
            });
        }
    } catch (err) {

        return res.status(400).json({
            message: 'Something Went Wrong',
            error: err
        });
    }

}

//To delete user by id
exports.deleteUserById = async (req, res, next) => {
    try {
        const resp = await userService.getUserDetails(req.params.userID);

        if (resp.error) {
            return res.status(resp.statusCode).json({
                message: resp.message,
                data: resp.data
            });
        } else {
            await models.user.update({
                isActive: false
            }, { where: { id: req.params.userID, isActive: true } });

            return res.status(201).json({
                message: 'User Deleted Successfully!'
            });
        }
    } catch (err) {

        return res.status(400).json({
            message: 'Something Went Wrong',
            error: err
        });
    }

}

//To create report of new users added daily
exports.newUserReport = async () => {
    try {
        await mkdirFs('./public/uploads/Reports', { recursive: true });

        const fileName = new Date().getTime();
        const options = {
            filename: `./public/uploads/Reports/user-report-${fileName}.xlsx`
        };
        let workbook = new Excel.stream.xlsx.WorkbookWriter(options);
        let worksheet = workbook.addWorksheet('sheet1');

        let reportResponse = await userService.newUserDetails();

        if (reportResponse.error) {
            throw new Error(reportResponse.message)
        }

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 10 },
            { header: 'Email', key: 'email', width: 10 },
            { header: 'Created At', key: 'createdAt', width: 10 },

        ]
        for (let index = 0; index < reportResponse.excelRowsArray.length; index++) {
            worksheet.addRow(reportResponse.excelRowsArray[index]).commit();
            if (index % 10000 === 0) await Promise.resolve(true)
        }
        await workbook.commit();

        return
    } catch (err) {
        console.log('err', err);
    }
}
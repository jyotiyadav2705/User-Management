module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        // attributes

        email: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [0, 100]
                }
            },
            allowNull: false,
            unique: true
        },
        name: {
            type: DataTypes.STRING
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
    }, {
        freezeTableName: true,
        tableName: 'user',
    });

    return User;
}
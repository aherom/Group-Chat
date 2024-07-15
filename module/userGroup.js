const Sequelize = require('sequelize');
const sequelize = require('../util/dbconfig');
const User = require('../module/user');
const Group = require('../module/group')

const UserGroup = sequelize.define('userGroup', {
    userGroupId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = UserGroup;

const Sequelize = require('sequelize');
const sequelize = require('../util/dbconfig');
const User = require('../module/user');
const Group = require('../module/group');

const GroupRequest = sequelize.define('groupRequest', {
    requestId: {
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
    groupId: {
        type: Sequelize.INTEGER,
        references: {
            model: Group,
            key: 'groupId'
        }
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending' // can be 'pending', 'approved', or 'rejected'
    }
});

module.exports = GroupRequest;

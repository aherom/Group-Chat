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
    }
});

module.exports = GroupRequest;

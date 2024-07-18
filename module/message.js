const Sequelize = require('sequelize');
const sequelize = require('../util/dbconfig');
const User = require('../module/user');
const Group = require('../module/group');

const Message = sequelize.define('message', {
    messageId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    filePath: {
        type: Sequelize.STRING,
        allowNull: true 
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    userName: {  
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Message;

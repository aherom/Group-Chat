const Sequelize = require('sequelize');
const sequelize = require('../util/dbconfig');


const Group = sequelize.define('group', {
    groupId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Group;
const Sequelize = require('sequelize')

const sequelize = new Sequelize('groupchat','root','aneomaher',
    {
        dialect : 'mysql',
        host:'localhost'
    }
)

module.exports = sequelize;
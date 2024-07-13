const Sequelize = require('sequelize');
const sequelize = require('../util/dbconfig');

const User = sequelize.define('user',
    {
        id :{
                 type:Sequelize.INTEGER,
                 autoIncrement:true,
                 primaryKey:true
            },
       phone:
       {
          type:Sequelize.STRING,
          allowNull:false
       },
       name:Sequelize.STRING,  
       email :
       {
         type:Sequelize.STRING,
         allowNull:false
       },
       password:
       {
         type:Sequelize.STRING,
         allowNull:false
       }
       
    }
);

module.exports=User;
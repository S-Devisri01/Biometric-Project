
const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const mysql = require('mysql2');
// const { all } = require('../route/logroute');
const app =express();

const sequelize = new Sequelize('sign', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });


const regg = sequelize.define ('regg',{
 //const regg = express.define(req,res,next ,{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:{message:'username cant be empty'}
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:{message : 'it is not email format'},
           
            notEmpty:{message:'email place cant be empty '}
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{  
                notEmpty:{message:'password cant be empty'},
                len:{
                    args:[8,255],
                    message:'password atleast have 8 characters'
                },
            }
        },
        batch: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Batch cannot be empty' }
            }
        },
        role:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                
                notEmpty:{message:'role cant be empty'}
            },
        },
        institution:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                
                notEmpty:{message:'institution cant be empty'}
            },
        },
        department: {
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{message:'department cant be empty '}
            },
        },
        sinnumber:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                is:/^e\d{2}[a-z]{2}\d{3}$/i,
                notEmpty:{
                    msg:'sin number cant be emppty'
                }
            },
        }
    });

sequelize.sync ()
.then(()=>{
    console.log('synced');
})
.catch((err)=>{
    console.log("not synced");
})

// sequelize.drop()
//     .then(() => {
//         console.log('Table dropped');
//         return sequelize.sync();  // Recreate the table
//     })
//     .then(() => {
//         console.log('Table recreated');
//     })
//     .catch((err) => {
//         console.error('Error:', err);
//     });
module.exports=regg;
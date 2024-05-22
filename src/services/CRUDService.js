import bcrypt from 'bcryptjs';
import { promiseImpl } from 'ejs';
import db from '../models/index';
import { raw } from 'body-parser';
import { where } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async(data) =>{
    return new Promise(async (resolve,reject)=>{
        try {
            let hashPasswordFromBycrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBycrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber:data.phonenumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId
            })
            resolve('ok create a new user succeed!')
        } catch (e) {
            reject(e)
        }
    })
   
}    


let hashUserPassword = (password) =>{
    return new Promise(async(resolve,reject) => {    
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }

    var hash = bcrypt.hashSync("B4c0/\/", salt);
    })
}

let getAllUser = () => {
    return new Promise(async(resolve,reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

let getUserInfoById = (userId)=>{
    return new Promise(async(resolve, reject)=>{
        try {
            let user = await db.User.findOne({
                where: {id: userId},
                raw: false
            })
            if(user){
                resolve(user)
            }
            else{
                resolve({})
            }
        } catch (e) {
            reject(e)
        }
    })
}

let updateUserData = async(data) =>{
    return new Promise (async(resolve,reject) =>{
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve();

            }else{
                resolve();
            }
        } catch (e) {
            reject(e)
        }
    })
}

let deleteUserById = (userId) =>{
    return new Promise (async(resolve,reject) =>{
        try {
            let user = await db.User.findOne({
                where: {id:userId}
            })
            if (user) {
                await user.destroy();
            }
           resolve();
            }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createNewUser:createNewUser,
    getAllUser:getAllUser,
    getUserInfoById:getUserInfoById,
    updateUserData:updateUserData,
    deleteUserById:deleteUserById
}
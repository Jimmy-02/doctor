import bcrypt from 'bcryptjs';
import { promiseImpl } from 'ejs';
import db from '../models/index';

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

module.exports = {
    createNewUser:createNewUser
}
import { json } from 'body-parser';
import db from '../models/index';
import CRUDService from '../services/CRUDService';


let getHomepage = async (req,res) => {
try {
    let data = await db.User.findAll();
    return res.render('homepage.ejs',{
        data: JSON.stringify(data)
    });
} catch (e) {
    console.log(e);
 }
}
let getCRUD = (req,res) => {
    return res.render("crud")
}
let postCRUD = async(req,res) => {
    await CRUDService.createNewUser(req.body);
    
    res.redirect("/get-crud");
}

let displayGetCRUD = async(req,res)=>{
    let data = await CRUDService.getAllUser();
    return res.render("displayCRUD", {
        dataTable: data
    })
}
let getEditCRUD = async(req,res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);

        return res.render('editCRUD',{
            user: userData
        })
    }
    else{
        return res.send("user not found")
    }
}

let putCRUD = async(req,res) => {
    let data = req.body;
    await CRUDService.updateUserData(data);
    res.redirect("/get-crud");
}

let deleteCRUD = async(req,res) => {
    let id = req.query.id;
    await CRUDService.deleteUserById(id);
    if(id){
        await CRUDService.deleteUserById(id);

        res.redirect("/get-crud");

    }
    else{
        return res.send("con cặc")
    }
}

module.exports = {
    getHomepage: getHomepage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
    deleteCRUD:deleteCRUD
}
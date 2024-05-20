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
    let message = await CRUDService.createNewUser(req.body);
    console.log(message)
    
    return res.send("aaaaaaaaa")
}

let displayGetCRUD = async(req,res)=>{
    let data = await CRUDService.getAllUser();
    console.log('-------------')

    console.log(data)
    console.log('-------------')

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


module.exports = {
    getHomepage: getHomepage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    displayGetCRUD:displayGetCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD
}
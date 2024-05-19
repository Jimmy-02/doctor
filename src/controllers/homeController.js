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
module.exports = {
    getHomepage: getHomepage,
    getCRUD:getCRUD,
    postCRUD:postCRUD
}
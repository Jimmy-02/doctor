import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/a', (req,res)=>{
        return res.send("daaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaawaw")
    });
    return app.use("/", router);
}

module.exports = initWebRoutes;
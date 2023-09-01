const { BlogController } = require("../../Http/Controller/Admin/Blog/Blog.Controller");
const { stringToArray } = require("../../Http/Middleware/StringToArray");
const { uploadFile } = require("../../Utills/Multer");

const router = require("express").Router();

router.post("/create", 
uploadFile("Blogs").fields([{name: "images", maxCount: 10}]), 
stringToArray("tags"),
BlogController.createBlog)

module.exports = {
    AdminApiBlogRoutes: router
}
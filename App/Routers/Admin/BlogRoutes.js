const { BlogController } = require("../../Http/Controller/Admin/Blog/Blog.Controller");
const { uploadFile } = require("../../Utills/Multer");

const router = require("express").Router();

router.post("/create", uploadFile("Blogs").fields([{name: "images", maxCount: 10}]), BlogController.createBlog)

module.exports = {
    AdminApiBlogRoutes: router
}
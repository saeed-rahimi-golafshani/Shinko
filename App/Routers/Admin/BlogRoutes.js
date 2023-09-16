const { BlogController } = require("../../Http/Controller/Admin/Blog/Blog.Controller");
const { stringToArray } = require("../../Http/Middleware/StringToArray");
const { uploadFile } = require("../../Utills/Multer");

const router = require("express").Router();

router.post("/create", 
    uploadFile("Blogs").fields([{name: "images", maxCount: 10}]), 
    stringToArray("tags"),BlogController.createBlog);
router.get("/list", BlogController.listOfBlog);
router.get("/list/:id", BlogController.listOfBlogById);
router.get("/list_author/:authorId", BlogController.listOfBlogByAuthor);
router.get("/list_blogcategory/:catId", BlogController.listOfBlogByCategory);
router.patch("/update/:id", 
    uploadFile("Blogs").fields([{name: "images", maxCount: 10}]), 
    stringToArray("tags"), BlogController.updateBlog);
router.delete("/remove/:id", BlogController.removeBlog);
module.exports = {
    AdminApiBlogRoutes: router
}
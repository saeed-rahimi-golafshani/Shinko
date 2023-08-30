const { BlogCategoryController } = require("../../Http/Controller/Admin/Blog/BlogCategory.Controller");
const { uploadFile } = require("../../Utills/Multer");
const router = require("express").Router();

router.post("/create", uploadFile("BlogCategory").fields([{name: "icon"}]), BlogCategoryController.createBlogCategory);
router.get("/list", BlogCategoryController.listOfBlogCategory);
router.get("/list/:id", BlogCategoryController.listOfBlogCategoryById);
router.get("/list_of_all", BlogCategoryController.listAllBlogCategory);
router.get("/list-all", BlogCategoryController.listAllBlogCategory);
router.patch("/update/:id", uploadFile("BlogCategory").fields([{name: "icon"}]), BlogCategoryController.updateBlogCategory);

module.exports = {
    AdminApiBlogCategoryRoutes: router
}
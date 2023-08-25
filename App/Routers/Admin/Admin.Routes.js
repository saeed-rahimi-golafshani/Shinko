const { AdminApiBlogCategoryRoutes } = require("./BlogCategoryRoutes");

const router = require("express").Router();

router.use("/blog_category", AdminApiBlogCategoryRoutes);

module.exports = {
    AdminApiRoutes: router
}
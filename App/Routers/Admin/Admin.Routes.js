const { AdminApiBlogCategoryRoutes } = require("./BlogCategoryRoutes");
const { AdminApiBlogRoutes } = require("./BlogRoutes");

const router = require("express").Router();

router.use("/blog_category", AdminApiBlogCategoryRoutes);
router.use("/blog", AdminApiBlogRoutes)

module.exports = {
    AdminApiRoutes: router
}
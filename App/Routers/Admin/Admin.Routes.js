const { AdminApiBlogCategoryRoutes } = require("./BlogCategoryRoutes");
const { AdminApiBlogRoutes } = require("./BlogRoutes");
const { AdminApiProductCategoryRoutes } = require("./ProductCategory.Routes");

const router = require("express").Router();

router.use("/blog_category", AdminApiBlogCategoryRoutes);
router.use("/blog", AdminApiBlogRoutes);
router.use("/product_category", AdminApiProductCategoryRoutes);

module.exports = {
    AdminApiRoutes: router
}
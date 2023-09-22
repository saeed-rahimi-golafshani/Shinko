const { AdminApiBlogCategoryRoutes } = require("./BlogCategoryRoutes");
const { AdminApiBlogRoutes } = require("./BlogRoutes");
const { AdminApiProductCategoryRoutes } = require("./ProductCategory.Routes");
const { AdminApiProductTypeRoutes } = require("./ProductType.Routes");

const router = require("express").Router();

router.use("/blog_category", AdminApiBlogCategoryRoutes);
router.use("/blog", AdminApiBlogRoutes);
router.use("/product_category", AdminApiProductCategoryRoutes);
router.use("/product_type", AdminApiProductTypeRoutes);

module.exports = {
    AdminApiRoutes: router
}
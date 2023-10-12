const { AdminApiBlogCategoryRoutes } = require("./BlogCategoryRoutes");
const { AdminApiBlogRoutes } = require("./BlogRoutes");
const { AdminApiBrandRoutes } = require("./Brand.Routes");
const { AdminApiMenuRotes } = require("./Menu.Routes");
const { AdminApiOfferNameRoutes } = require("./OfferName.Routes");
const { AdminApiProductRoutes } = require("./Product.Routes");
const { AdminApiProductCategoryRoutes } = require("./ProductCategory.Routes");
const { AdminApiProductConfigAdvanceRoutes } = require("./ProductConfigAdvance.Routes");
const { AdminApiProductConfigPromotionRoutes } = require("./ProductConfigPromotion.Routes");
const { AdminApiProductTypeRoutes } = require("./ProductType.Routes");
const { AdminApiVariationRoutes } = require("./Variation.Routes");
const { AdminApiVariationOptionsRoutes } = require("./VariationOption.Routes");

const router = require("express").Router();

router.use("/blog_category", AdminApiBlogCategoryRoutes);
router.use("/blog", AdminApiBlogRoutes);
router.use("/product_category", AdminApiProductCategoryRoutes);
router.use("/product_type", AdminApiProductTypeRoutes);
router.use("/product", AdminApiProductRoutes);
router.use("/variation", AdminApiVariationRoutes);
router.use("/variation_option", AdminApiVariationOptionsRoutes);
router.use("/productConfig_Advance", AdminApiProductConfigAdvanceRoutes);
router.use("/productConfig_Promotion", AdminApiProductConfigPromotionRoutes);
router.use("/offer_name", AdminApiOfferNameRoutes);
router.use("/brand", AdminApiBrandRoutes);
router.use("/menu", AdminApiMenuRotes);

module.exports = {
    AdminApiRoutes: router
}
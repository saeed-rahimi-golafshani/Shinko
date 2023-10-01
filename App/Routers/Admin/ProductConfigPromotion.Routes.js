const { ProductConfigPromotionController } = require("../../Http/Controller/Admin/Product/ProductConfigPromotion.Controller");

const router = require("express").Router();

router.post("/create", ProductConfigPromotionController.createProductConfigPromotion);

module.exports = {
  AdminApiProductConfigPromotionRoutes: router
}
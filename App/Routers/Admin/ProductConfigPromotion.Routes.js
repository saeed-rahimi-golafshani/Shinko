const { ProductConfigPromotionController } = require("../../Http/Controller/Admin/Product/ProductConfigPromotion.Controller");
const router = require("express").Router();

router.post("/create", ProductConfigPromotionController.createProductConfigPromotion);
router.get("/offer", ProductConfigPromotionController.offerOfProductConfigPromotionByDate);
router.get("/list", ProductConfigPromotionController.listOfProductConfigPromotion);
router.get("/:id", ProductConfigPromotionController.listOfProductConfigPromotionById);
router.get("/list_offers/:offerId", ProductConfigPromotionController.listOfProductConfigPromotionByOfferNameId);
router.patch("/update/:id", ProductConfigPromotionController.updateProductConfigPromotion)

module.exports = {
  AdminApiProductConfigPromotionRoutes: router
}
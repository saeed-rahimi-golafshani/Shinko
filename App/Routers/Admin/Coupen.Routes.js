const { CoupenController } = require("../../Http/Controller/Admin/Coupens/Coupen.Controller");
const router = require("express").Router();

router.post("/create", CoupenController.crateCoupen);
router.get("/list", CoupenController.listOfCoupen);
 
module.exports = {
  AdminApiCoupenRoutes: router
}
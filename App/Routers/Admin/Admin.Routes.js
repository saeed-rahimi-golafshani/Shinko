const { checkPermission } = require("../../Http/Middleware/Permission.Guard");
const { PERMISSIONS } = require("../../Utills/Constants");
const { AdminApiBlogCategoryRoutes } = require("./BlogCategoryRoutes");
const { AdminApiBlogRoutes } = require("./BlogRoutes");
const { AdminApiBrandRoutes } = require("./Brand.Routes");
const { AdminApiCoupenRoutes } = require("./Coupen.Routes");
const { AdminApiCourseRoutes } = require("./Course.Routes");
const { AdminApiCourseStatusRoutes } = require("./CourseStatus.Routes");
const { AdminApiCourseTypeRoutes } = require("./CourseType.Routes");
const { AdminApiMenuRotes } = require("./Menu.Routes");
const { AdminApiOfferNameRoutes } = require("./OfferName.Routes");
const { AdminApiPermissionRoutes } = require("./Permission.Routes");
const { AdminApiProductRoutes } = require("./Product.Routes");
const { AdminApiProductCategoryRoutes } = require("./ProductCategory.Routes");
const { AdminApiProductConfigAdvanceRoutes } = require("./ProductConfigAdvance.Routes");
const { AdminApiProductConfigPromotionRoutes } = require("./ProductConfigPromotion.Routes");
const { AdminApiProductTypeRoutes } = require("./ProductType.Routes");
const { AdminApiRoleRoutes } = require("./Role.Routes");
const { AdmonApiRolePermissionRoutes } = require("./Role_Permissioin.Routes");
const { AdminApiUserRoutes } = require("./User.Routes");
const { AdminApiVariationRoutes } = require("./Variation.Routes");
const { AdminApiVariationCategoryRoutes } = require("./VariationCategory.Routes");
const { AdminApiVariationOptionsRoutes } = require("./VariationOption.Routes");
const router = require("express").Router();

router.use("/blog_category", checkPermission(
    [
        PERMISSIONS.ADMIN,
    ]), AdminApiBlogCategoryRoutes);
router.use("/blog", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiBlogRoutes);
router.use("/product_category", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiProductCategoryRoutes);
router.use("/product_type", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiProductTypeRoutes);
router.use("/product", checkPermission(
    [
        PERMISSIONS.ADMIN,
    ]), AdminApiProductRoutes);
router.use("/variation", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiVariationRoutes);
router.use("/variation_option", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiVariationOptionsRoutes);
router.use("/variation_category", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiVariationCategoryRoutes);
router.use("/productConfig_Advance", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiProductConfigAdvanceRoutes);
router.use("/productConfig_Promotion", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiProductConfigPromotionRoutes);
router.use("/offer_name", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiOfferNameRoutes);
router.use("/brand", checkPermission( 
    [
        PERMISSIONS.ADMIN
    ]), AdminApiBrandRoutes);
router.use("/menu", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiMenuRotes);
router.use("/course_status", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiCourseStatusRoutes);
router.use("/course_type", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiCourseTypeRoutes);
router.use("/course", checkPermission(
    [
        PERMISSIONS.ADMIN
    ]), AdminApiCourseRoutes);
router.use("/role", checkPermission(
    [
        PERMISSIONS.SUPER_ADMIN
    ]), AdminApiRoleRoutes); 
router.use("/permission", checkPermission(
    [
        PERMISSIONS.SUPER_ADMIN
    ]), AdminApiPermissionRoutes)
router.use("/role_permission", checkPermission(
    [
        PERMISSIONS.SUPER_ADMIN
    ]), AdmonApiRolePermissionRoutes);
router.use("/users", checkPermission(
    [
        PERMISSIONS.SUPER_ADMIN
    ]), AdminApiUserRoutes);
router.use("/coupen", checkPermission(
    [
        PERMISSIONS.SUPER_ADMIN
    ]), AdminApiCoupenRoutes);

module.exports = {
    AdminApiRoutes: router
}
const router = require("express").Router();
const controller = require("../controller/controller.js");

router.post("/registration", controller.register);
router.post("/login", controller.login);
router.post("/getUserData", controller.getUserData);
router.post("/addProduct", controller.addProduct);
router.post("/getProducts", controller.getProducts);
router.post("/addService", controller.addService);
router.post("/getServices", controller.getServices);
router.get("/getCategories", controller.getCategories);
router.post("/addBrand", controller.addBrand);
router.get("/getBrands", controller.getBrands);
router.post("/placeOrder", controller.placeOrder);
router.post("/getOrders", controller.getOrders);
router.post("/cancelOrder", controller.cancelOrder);
router.post("/acceptOrder", controller.acceptOrder);

module.exports = router;
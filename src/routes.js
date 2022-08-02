const express = require("express");
const router = express.Router();

const Auth = require("./middlewares/auth.js");

const AuthValidator = require("./validators/auth.js");

const AuthController = require("./controllers/auth.js");
const ProductController = require("./controllers/product.js");
const CategoryController = require("./controllers/category.js");

router.get("/ping", (req, res) => {
    res.json({ pong: true });
});

router.post("/user/signin", AuthValidator.signin, AuthController.signin);
router.post("/user/signup", AuthValidator.signup, AuthController.signup);

router.get("/product/list", ProductController.getList);
router.post("/product/add", Auth.private, ProductController.addProduct);
router.post("/product/remove", Auth.private, ProductController.removeProduct);

router.get("/category/list", CategoryController.getList);
router.post("/category/add", Auth.private, CategoryController.addCategory);
router.post(
    "/category/disable",
    Auth.private,
    CategoryController.disableCategory
);
router.post(
    "/category/enable",
    Auth.private,
    CategoryController.enableCategory
);

module.exports = router;

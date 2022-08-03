const express = require("express");
const router = express.Router();

const Auth = require("./middlewares/auth.js");

const AuthValidator = require("./validators/auth.js");
const ProductValidator = require("./validators/product.js");

const AuthController = require("./controllers/auth.js");
const ProductController = require("./controllers/product.js");
const CategoryController = require("./controllers/category.js");

router.get("/ping", (req, res) => {
    res.json({ pong: true });
});

// AUTH
router.post("/user/signin", AuthValidator.signin, AuthController.signin);
router.post("/user/signup", AuthValidator.signup, AuthController.signup);

// PRODUCT:
// CREATE
router.post(
    "/product/add",
    Auth.private,
    ProductValidator.addProduct,
    ProductController.addProduct
);

// READ
router.get("/product/list", ProductController.getList);
router.get("/product/:id", ProductController.getProduct);
router.get("/product/:id/ingredients", ProductController.getIngredients);

// UPDATE / DELETE
router.put(
    "/product/:id",
    Auth.private,
    ProductValidator.updateProduct,
    ProductController.updateProduct
);

router.put(
    "/product/:id/ingredients",
    Auth.private,
    ProductController.updateIngredients
);

router.post("/product/toggle", Auth.private, ProductController.toggleProduct);

// CATEGORY:
// CREATE
router.post("/category/add", Auth.private, CategoryController.addCategory);

// READ
router.get("/category/list", CategoryController.getList);
router.get("/category/:id", CategoryController.getItems);

// UPDATE / DELETE
router.post(
    "/category/toggle",
    Auth.private,
    CategoryController.toggleCategory
);

module.exports = router;

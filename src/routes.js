const express = require("express");
const router = express.Router();

const Auth = require("./middlewares/auth.js");

const AuthValidator = require("./validators/auth.js");
const ProductValidator = require("./validators/product.js");

const AuthController = require("./controllers/auth.js");
const ProductController = require("./controllers/product.js");
const CategoryController = require("./controllers/category.js");
const IngredientController = require("./controllers/ingredientes.js");
const FormasPagamentoController = require("./controllers/formaspagamento.js");
const ComandaController = require("./controllers/comanda.js");

router.get("/ping", (req, res) => {
    res.json({ pong: true });
});

// AUTH
router.post("/user/signin", AuthValidator.signin, AuthController.signin);

// CREATE
router.post(
    "/user/signup",
    Auth.private,
    AuthValidator.signup,
    AuthController.signup
);

// READ
router.get("/user/list", Auth.private, AuthController.getList);
router.get("/user/logged", Auth.private, AuthController.userLogged);

// UPDATE
router.put(
    "/user/:id",
    Auth.private,
    AuthValidator.update,
    AuthController.update
);

// DELETE
router.post("/user/delete", Auth.private, AuthController.delete);

// PRODUCT:
// CREATE
router.post(
    "/product/add",
    Auth.private,
    // ProductValidator.addProduct,
    ProductController.addProduct
);

// READ
router.get("/product/list", ProductController.getList);
router.get("/product/:id", ProductController.getProduct);
router.get("/product/:id/ingredients", ProductController.getIngredients);

// UPDATE / DELETE
router.post(
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

router.put("/category/:id", Auth.private, CategoryController.updateCategory);

//INGREDIENT
//->CREATED
router.post(
    "/ingredient/add",
    Auth.private,
    IngredientController.addIngredient
);
//-> LIST
router.get("/ingredient/list", IngredientController.getList);

// UPDATE
router.put(
    "/ingredient/:id",
    Auth.private,
    IngredientController.updateIngredient
);

// FORMAS DE PAGAMENTO
// CREATE
router.post(
    "/paymentmethod/add",
    Auth.private,
    FormasPagamentoController.addFormaPagamento
);

// READ
router.get("/paymentmethod/list", FormasPagamentoController.getList);

// UPDATE
router.put(
    "/paymentmethod/:id",
    Auth.private,
    FormasPagamentoController.updateFormaPagamento
);

router.post(
    "/paymentmethod/toggle",
    Auth.private,
    FormasPagamentoController.toggleFormaPagamento
);

//COMANDA

//READ

router.get("/comanda/list", Auth.private, ComandaController.getList);

// CREATE
router.post("/comanda/item/add", Auth.private, ComandaController.addItem);
router.post("/comanda/add", Auth.private, ComandaController.addComanda);

//UPDATE
router.post("/comanda/item/cancel", Auth.private, ComandaController.cancelItem);
router.post("/comanda/payment", Auth.private, ComandaController.payment);

module.exports = router;

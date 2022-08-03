const { validationResult, matchedData } = require("express-validator");

const Category = require("../models/category.js");
const Product = require("../models/product.js");

const idRegex = /[0-9]+/;

module.exports = {
    // CREATE
    addProduct: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        let { name, description, price, category } = data;

        const categoryExists = await Category.findByPk(category);

        if (!categoryExists) {
            return res.status(400).json({
                error: "Categoria não existe",
            });
        }

        price = price.replace(".", "").replace(",", ".").replace("R$ ", "");
        price = parseFloat(price);

        const product = await Product.create({
            nm_produto: name,
            valor: price,
            descricaoproduto: description,
            id_categoria: category,
            flsituacao: 1,
        });

        return res.json({
            product,
        });
    },

    // READ
    getProduct: async (req, res) => {
        let { id } = req.params;

        if (!id)
            return res.status(400).json({
                error: "Produto Inválido",
            });

        if (!id.match(idRegex)) {
            return res.status(400).json({
                error: "Produto inválido",
            });
        }

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(400).json({
                error: "Produto não existe",
            });
        }

        res.json({
            product,
        });
    },

    getList: async (req, res) => {
        let total = 0;
        let { sort = "asc", offset = 0, limit = 8, q, cat } = req.query;

        let filters = { flsituacao: 1 };

        if (q) filters.nm_produto = new RegExp(q, "i");
        if (cat) {
            const category = await Category.findOne({
                where: { nm_categoria: cat },
            });
            if (category) filters.category = category._id.toString();
        }

        let products;

        products = await Product.findAll({
            where: filters,
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [["nm_produto", sort]],
        });
        total = products.length;
        products = products.map((product) => {
            return product.toJSON();
        });

        res.json({
            total,
            products,
        });
    },

    // UPDATE/DELETE
    updateProduct: async (req, res) => {
        let { id } = req.params;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({ error: errors.mapped() });
        }

        const data = matchedData(req);

        if (Object.keys(data).length === 0) {
            return res.status(400).json({
                error: "Nenhum dado foi enviado",
            });
        }

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(400).json({
                error: "Produto não existe",
            });
        }

        let { name, description, price, category } = data;

        if (name) product.nm_produto = name;
        if (description) product.descricaoproduto = description;
        if (price) {
            price = price.replace(".", "").replace(",", ".").replace("R$ ", "");
            price = parseFloat(price);
            product.valor = price;
        }
        if (category) product.id_categoria = category;

        await product.save();

        return res.json({
            product,
        });
    },

    toggleProduct: async (req, res) => {
        let { id } = req.body;

        if (!id)
            return res.status(400).json({
                error: "Produto Inválido",
            });

        if (!id.match(idRegex)) {
            return res.status(400).json({
                error: "Produto inválido",
            });
        }

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(400).json({
                error: "Categoria não existe",
            });
        }

        await product.update({
            flsituacao: product.flsituacao === 0 ? 1 : 0,
        });

        res.json({
            product,
        });
    },
};

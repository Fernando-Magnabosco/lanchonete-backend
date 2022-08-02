const { validationResult, matchedData } = require("express-validator");

const Category = require("../models/category.js");
const Product = require("../models/product.js");

const idRegex = /[0-9]+/;

module.exports = {
    addProduct: async (req, res) => {
        let { name, price, description, category } = req.body;

        if (!name || !category || !price || !description) {
            return res.status(400).json({
                error: "Algum campo está vazio",
            });
        }

        if (!category.match(idRegex)) {
            return res.status(400).json({
                error: "Categoria inválida",
            });
        }

        const categoryExists = await Category.findByPk(category);

        if (!categoryExists) {
            return res.status(400).json({
                error: "Categoria não existe",
            });
        }

        if (description.length > 500) {
            return res.status(400).json({
                error: "Descrição muito longa",
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

    removeProduct: async (req, res) => {
        let { id } = req.body;

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

        if (product.flsituacao === 0) {
            return res.status(400).json({
                error: "Produto já excluído",
            });
        }

        await product.update({
            flsituacao: 0,
        });

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
};

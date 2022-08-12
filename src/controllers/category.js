const { validationResult, matchedData } = require("express-validator");

const Category = require("../models/category.js");
const Product = require("../models/product.js");

const idRegex = /[0-9]+/;

module.exports = {
    // CREATE

    addCategory: async (req, res) => {
        let { name } = req.body;

        if (!name) {
            return res.status(400).json({
                error: "Nome Inválido",
            });
        }
        const category = await Category.create({
            nm_categoria: name,
            flsituacao: true,
        });

        return res.json({
            category,
        });
    },

    // READ
    getItems: async (req, res) => {
        let { id } = req.params;

        if (!id) {
            return res.status(400).json({
                error: "Categoria Inválida",
            });
        }

        let products = await Product.findAll({
            where: { id_categoria: id },
        });

        if (!products) {
            return res.json({});
        }

        return res.json({
            products,
        });
    },

    getList: async (req, res) => {
        let total = 0;
        let { sort = "asc", offset = 0, limit = 8 } = req.query;

        const categories = await Category.findAll({
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [["nm_categoria", sort]],
        });
        total = categories.length;

        res.json({
            total,
            categories,
        });
    },

    // UPDATE/DELETE
    toggleCategory: async (req, res) => {
        let { id } = req.body;

        if (!id) {
            return res.status(400).json({
                error: "Categoria Inválida",
            });
        }

        if (!id.match(idRegex)) {
            return res.status(400).json({
                error: "Categoria inválida",
            });
        }

        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(400).json({
                error: "Categoria não existe",
            });
        }

        await category.update({
            flsituacao: !category.flsituacao,
        });

        res.json({
            category,
        });
    },

    updateCategory: async (req, res) => {
        let { id } = req.params;
        let { name } = req.body;

        if (!id) {
            return res.status(400).json({
                error: "Categoria Inválida",
            });
        }

        if (!id.match(idRegex)) {
            return res.status(400).json({
                error: "Categoria inválida",
            });
        }
        const category = await Category.findByPk(id);

        if (!category) {
            return res.status(400).json({
                error: "Categoria não existe",
            });
        }

        await category.update({
            nm_categoria: name,
        });

        res.json({
            category,
        });
    },
};

const { validationResult, matchedData } = require("express-validator");

const Category = require("../models/category.js");
const Product = require("../models/product.js");

const idRegex = /[0-9]+/;

module.exports = {
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

    disableCategory: async (req, res) => {
        let { id } = req.body;

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

        if (category.flsituacao === false) {
            return res.status(400).json({
                error: "Categoria já excluída",
            });
        }

        await category.update({
            flsituacao: false,
        });

        const products = await Product.findAll({
            where: {
                id_categoria: id,
            },
        });

        for (let product of products) {
            await product.update({
                flsituacao: 0,
            });
        }

        res.json({
            category,
        });
    },


    getList: async (req, res) => {
        let total = 0;
        let { sort = "asc", offset = 0, limit = 8 } = req.query;

        const categories = await Category.findAll({
            where: { flsituacao: true },
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
};

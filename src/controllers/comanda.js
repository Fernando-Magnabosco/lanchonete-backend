const Comanda = require("../models/comanda.js");
const User = require("../models/user.js");
const ProdutosComanda = require("../models/produtosComanda.js");
const Product = require("../models/product.js");

module.exports = {
    getList: async (req, res) => {
        let { sort = "asc", offset = 0, limit = 30 } = req.query;
        let where = {};

        if (req.query.id_garcom) {
            where.id_garcom = req.query.id_garcom;
        }
        if (req.query.situacao) where.situacao = req.query.situacao;

        const comandas = await Comanda.findAll({
            offset: parseInt(offset),
            limit: parseInt(limit),
            order: [["situacao", "desc"]],
            include: [{ model: User, as: "garcom", attributes: ["name"] }],
            where,
        });

        for (const comanda of comandas) {
            const produtosComanda = await ProdutosComanda.findAll({
                include: [
                    { model: Product, attributes: ["nm_produto"] },
                    { model: User, attributes: ["name"] },
                ],

                where: { id_comanda: comanda.id_comanda },
                order: [["vlvenda", sort]],
            });
            comanda.dataValues.produtos = produtosComanda;
        }

        total = comandas.length;
        return res.json({
            comandas,
            total,
        });
    },

    cancelItem: async (req, res) => {
        const { produto, comanda, reason, garcom } = req.body;
        const produtosComanda = await ProdutosComanda.findOne({
            where: { id_produto: produto, id_comanda: comanda },
        });
        if (!produtosComanda) {
            return res.status(400).json({
                error: "Produto não existe",
            });
        }
        produtosComanda.pedidocancelado = true;
        produtosComanda.motivo = reason;
        produtosComanda.garcomalteracao = garcom.id;
        await produtosComanda.save();

        return res.json({
            message: "Produto cancelado com sucesso",
        });
    },
};

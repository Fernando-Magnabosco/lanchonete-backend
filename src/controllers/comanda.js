const Comanda = require("../models/comanda.js");
const User = require("../models/user.js");

module.exports = {
    getList: async (req, res) => {
        let { sort = "asc", offset = 0, limit = 8 } = req.query;
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

        total = comandas.length;
        return res.json({
            comandas,
            total,
        });
    },
};

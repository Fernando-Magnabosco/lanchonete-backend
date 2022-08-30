
const FormasPagamento = require("../models/formaspagamento.js");

const idRegex = /[0-9]+/;

module.exports = {
    addFormaPagamento: async (req, res) => {
        let { name } = req.body;
        console.log(name);

        if (!name) {
            return res.status(404).json({
                error: "Nome inválido",
            });
        }

        const formaPagamento = await FormasPagamento.create({
            nomeformapagamento: name,
            flsituacao: "true",
        });

        return res.json({
            formaPagamento,
        });
    },

    getList: async (req, res) => {
        const total = 0;

        const formasPagamento = await FormasPagamento.findAll({
            order: [["nomeformapagamento", "asc"]],
        });

        res.json({
            formasPagamento,
        });
    },

    updateFormaPagamento: async (req, res) => {
        let { id } = req.params;

        if (!id) {
            return res.status(404).json({
                error: "Forma de pagamento inválida",
            });
        }

        let { name } = req.body;

        if (!name) {
            return res.status(404).json({
                error: "Nome inválido",
            });
        }

        const formaPagamento = await FormasPagamento.update(
            {
                nomeformapagamento: name,
            },
            {
                where: {
                    idformapagamento: id,
                },
            }
        );

        return res.json({
            formaPagamento,
        });
    },

    toggleFormaPagamento: async (req, res) => {
        let { id } = req.body;
        
        if (!id) {
            return res.status(400).json({
                error: "Forma de pagamento inválida",
            });
        }

        if (!id.match(idRegex)) {
            return res.status(400).json({
                error: "Forma de pagamento inválida",
            });
        }

        const forma = await FormasPagamento.findByPk(id);

        if (!forma) {
            return res.status(400).json({
                error: "Forma de pagamento não existe",
            });
        }

        await forma.update({
            flsituacao: !forma.flsituacao,
        });

        res.json({
            forma,
        });
    },

};

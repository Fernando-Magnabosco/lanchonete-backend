
const FormasPagamento = require("../models/formaspagamento.js");

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

        let { nome } = req.body;

        if (!nome) {
            return res.status(404).json({
                error: "Nome inválido",
            });
        }

        const formaPagamento = await FormasPagamento.update(
            {
                nomeformapagamento: nome,
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

    removeFormaPagamento: async (req, res) => {
        let { id } = req.params;

        if (!id) {
            return res.status(404).json({
                error: "Forma de pagamento inválida",
            });
        }

        const formaPagamento = await FormasPagamento.destroy({
            where: {
                idformapagamento: id,
            },
        });

        return res.json({
            formaPagamento,
        });
    },
};

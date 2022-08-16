
const FormasPagamento = require("../models/formaspagamento.js");

module.exports = {
    addFormaPagamento: async (req, res) => {
        let { nome } = req.body;

        if (!nome) {
            return res.status(404).json({
                error: "Nome inválido",
            });
        }

        const formaPagamento = await FormasPagamento.create({
            nm_forma_pagamento: nome,
        });

        return res.json({
            formaPagamento,
        });
    },

    getList: async (req, res) => {
        const total = 0;

        const formasPagamento = await FormasPagamento.findAll({
            order: [["nm_forma_pagamento", "asc"]],
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
                nm_forma_pagamento: nome,
            },
            {
                where: {
                    id_forma_pagamento: id,
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
                id_forma_pagamento: id,
            },
        });

        return res.json({
            formaPagamento,
        });
    },
};

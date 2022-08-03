const { checkSchema } = require("express-validator");

const idRegex = /[0-9]+/;

module.exports = {
    addProduct: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: { max: 30 },
                errorMessage: "Nome muito longo.",
            },
        },
        description: {
            isLength: {
                options: { min: 10, max: 500 },
                errorMessage: "Descrição inválida.",
            },
        },
        price: {
            isLength: {
                options: { min: 1 },
                errorMessage: "Preço não informado.",
            },
        },
        category: {
            isLength: {
                options: { min: 1 },
                errorMessage: "Categoria não informada.",
            },
            matches: {
                options: idRegex,
                errorMessage: "Categoria inválida.",
            },
        },
    }),

    updateProduct: checkSchema({
        name: {
            optional: true,
            trim: true,
            isLength: {
                options: { max: 30 },
                errorMessage: "Nome muito longo.",
            },
        },
        description: {
            optional: true,
            isLength: {
                options: { max: 500 },
                errorMessage: "Descrição muito longa.",
            },
        },
        price: {
            optional: true,
        },
        category: {
            optional: true,
            matches: {
                options: idRegex,
                errorMessage: "Categoria inválida.",
            },
        },
    }),
};

const { checkSchema } = require("express-validator");

module.exports = {
    signin: checkSchema({
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Email inválido",
        },
        password: {
            isLength: {
                options: { min: 8 },
            },
            errorMessage: "A senha deve conter pelo menos 8 caracteres",
        },
    }),

    signup: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: { min: 2, max: 30 },
            },
            errorMessage: "Nome deve conter entre 2 e 30 caracteres",
        },
        email: {
            isEmail: true,
            normalizeEmail: true,
            errorMessage: "Email inválido",
        },
        password: {
            isLength: {
                options: { min: 8 },
            },
            errorMessage: "A senha deve conter pelo menos 8 caracteres",
        },
        isAdmin: {
            isBoolean: true,
            errorMessage: "O campo isAdmin deve ser true ou false",
        },
    }),

    update: checkSchema({
        name: {
            trim: true,
            isLength: {
                options: { min: 2, max: 30 },
            },
            errorMessage: "Nome deve conter entre 2 e 30 caracteres",
        },
        password: {
            isLength: {
                options: { min: 8 },
            },
            errorMessage: "A senha deve conter pelo menos 8 caracteres",
        },
        isAdmin: {
            isBoolean: true,
            errorMessage: "O campo isAdmin deve ser true ou false",
        },
    }),
};

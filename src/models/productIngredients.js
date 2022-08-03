const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const modelSchema = db.define(
    "ingredientesproduto",
    {
        id_ingredientesproduto: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_produto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Produto",
                key: "id_produto",
            },
        },
        id_ingrediente: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Ingrediente",
                key: "id_ingrediente",
            },
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = modelSchema;

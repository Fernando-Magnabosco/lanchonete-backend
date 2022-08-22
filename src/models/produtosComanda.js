const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");
const Product = require("../models/product");
const User = require("../models/user");
const modelSchema = db.define(
    "produtoscomanda",
    {
        id_produtosComanda: {
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
        id_comanda: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Comanda",
                key: "id_comanda",
            },
        },
        dataprodutoscomanda: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        vlvenda: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        pedidocancelado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        garcomalteracao: {
            type: DataTypes.INTEGER,
            references: {
                model: "User",
                key: "_id",
            },
        },
        motivocancelamento: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);
modelSchema.belongsTo(Product, { foreignKey: "id_produto" });
modelSchema.belongsTo(User, { foreignKey: "garcomalteracao" });
module.exports = modelSchema;

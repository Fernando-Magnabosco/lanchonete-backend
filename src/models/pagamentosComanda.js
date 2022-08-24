const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const modelSchema = db.define(
    "pagamentosComanda",
    {
        idpagamentosComanda: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        idcomanda: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Comanda",
                key: "id_comanda",
            },
        },
        idformaPagamento: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "formaspagamento",
                key: "idformapagamento",
            },
        },
        vlPagamento: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = modelSchema;

const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const modelSchema = db.define(
    "Comanda",
    {
        id_comanda: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_garcom: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "garcom",
                key: "id_garcom",
            },
        },
        valor_final: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        mesa: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        situacao: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        desconto: {
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = modelSchema;

const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const modelSchema = db.define(
    "comanda",
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
                key: "idgarcom",
            },
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

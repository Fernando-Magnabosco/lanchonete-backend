const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");

const modelSchema = db.define(
    "Image",
    {
        _id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        default: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        product: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "Produto",
                key: "id_produto",
            },
        },
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = modelSchema;

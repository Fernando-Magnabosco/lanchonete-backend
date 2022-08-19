const { Sequelize, DataTypes } = require("sequelize");
const db = require("../db");
const User = require("../models/user");
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
                model: "User",
                key: "_id",
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

modelSchema.belongsTo(User, { foreignKey: "id_garcom", as: "garcom" });

module.exports = modelSchema;

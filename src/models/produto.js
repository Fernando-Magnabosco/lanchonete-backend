const { Sequelize, DataTypes } = require("sequelize");
const db = require('../db');

const modelSchema = db.define("produto", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nm_produto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
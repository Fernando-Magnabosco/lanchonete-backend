const { Sequelize, DataTypes } = require("sequelize");
const db = require('../db');

const modelSchema = db.define("produto", {
    id_produto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nm_produto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categoria',
            key: 'id_categoria'
        }
    },
    valor: {
        type: DataTypes.FLOAT,  
        allowNull: false,
    },
    flsituacao: {
        type: DataTypes.INTEGER,  
        allowNull: false,
    }
});
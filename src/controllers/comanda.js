const { validationResult, matchedData } = require("express-validator");

const Product = require("../models/product.js");
const User = require("../models/user.js");
const Comanda = require("../models/comanda.js");
const ComandaProducts = require("../models/produtoscomanda");
const db = require("../db");

module.exports = {
    //CREATE

    addComanda: async (req, res) => {
        let {mesa, ID, listProducts, price} = req.body;

        const comanda = await Comanda.create({
            id_garcom: parseInt(ID),
            valor_final: price,
            mesa: parseInt(mesa),
            data: new Date(),
            situacao: 1,
            desconto: 0,
        }, {raw:true}); 

        for(const cont of listProducts){
            const addProducts = ComandaProducts.create({
                id_comanda: comanda.id_comanda,
                id_produto: cont.id_produto
            })
        }
        
        return res.json(comanda);
    },

    //
    listComanda: async (req, res) => {
        let { sort = "asc", offset = 0} = req.query;

        const listComandas = await Comanda.findAll({
            offset: parseInt(offset),
            order: [["situacao", asc]],
            where: {situacao: 0}
        })

        res.json(listComandas);
    }
}
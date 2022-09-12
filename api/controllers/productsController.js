const express = require('express');
const fs = require('fs')
const path = require('path');


const productController = {
allProduct: function(req,res){

    try {
        if(res.status(200)){
            const readAllProduct = fs.readFileSync('api/data/products.json','utf-8')
            const readAllProductParsered = JSON.parse(readAllProduct)  
            res.send(readAllProductParsered)
        }else{
            res.status(500).send("Sever Error")
        }
       

    } catch(error) {
        res.send(error)
        console.log("Catch error" + error);
    }
},

oneProduct: function(req,res){
    const porductByParams = req.params.id;

    try {
        if(res.status(200).res.send({"Msg": "Ok"})){
            
            const readAllProduct = fs.readFileSync('api/data/products.json','utf-8')
            const readAllProductParsered = JSON.parse(readAllProduct)  
            res.send(readAllProductParsered)

        }else{

            res.status(500).res.json({"Msg": "Sever Error"})
        }
       

    } catch(error) {
        res.send(error)
        console.log("Catch error" + error);
    }
}





}


module.exports = productController
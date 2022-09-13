const { json } = require("express");
const express = require("express");
const fs = require("fs");
const path = require("path");

const productController = {
  allProduct: function (req, res) {
    const readAllProduct = fs.readFileSync("api/data/products.json", "utf-8");
    const readAllProductParsered = JSON.parse(readAllProduct);

    try {
      res.status(200).json(readAllProductParsered);
    } catch (error) {
      res.send(error);
      console.log("Catch error" + error);
    }
  },

  oneProduct: function (req, res) {
    try {
      if (res.status(200)) {
        const readAllProduct = fs.readFileSync(
          "api/data/products.json",
          "utf-8"
        );
        const readAllProductParsered = JSON.parse(readAllProduct);
        const filteredProduct = readAllProductParsered.filter((product) => {
          return product.id === Number(req.params.id);
        });
        res.send(filteredProduct);
      } else {
        res.status(500).send("Sever Error");
      }
    } catch (error) {
      res.send(error);
      console.log("Catch error " + error);
    }
  },

  createProdut: function (req, res) {
    const readProducts = fs.readFileSync("api/data/products.json", "utf-8");
    const productParsered = JSON.parse(readProducts);

    const newProduct = {
      id: productParsered.at(-1).id + 1,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      gallery: req.body.image,
      category: req.body.category,
      price: req.body.price,
    };

    try {
      if (Object.values(newProduct) === "") {
        res.status(400).json({
          ok: false,
          msg: "Tiene que agregar todos los datos",
        });
      } else {
        productParsered.push(newProduct);
        res.status(200).json({
          ok: true,
          msg: "producto agregado",
        });

        fs.writeFileSync(
          "api/data/products.json",
          JSON.stringify(productParsered)
        );
      }
    } catch (error) {
      res.json(" Aca esta el " + error);
    }
  },

  productEdit: function (req, res) {
    const { id, ...restoDeElementos } = req.body;
    const idProduct = req.params.id

    console.log(idProduct);
    

    try {
      const dataToParse = fs.readFileSync("api/data/products.json", "utf-8");
      const data = JSON.parse(dataToParse);

      const dataUpdate = data.map((product) => {
        if (product.id === Number(idProduct)) {
          const newEl = { ...product, ...restoDeElementos };
          console.log(newEl);
          return newEl;
        } else {
          //console.log(product);
          return product;
        }
      });
      fs.writeFileSync("api/data/products.json", JSON.stringify(dataUpdate));
      res.send(dataUpdate);
    } catch (error) {
      console.log(error);
      res.send("Error inesperado");
    }
  },

  mostWanted: function(req,res){
    
    const wantedParam = req.params.mostwanted
    
    const readProducts = fs.readFileSync("api/data/products.json", "utf-8");
    const productParsered = JSON.parse(readProducts);

    const filteredProduct = productParsered.find((product) => {
      
    });
    console.log(filteredProduct);

  }
};

module.exports = productController;

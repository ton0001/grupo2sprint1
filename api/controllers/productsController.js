const express = require("express");
const fs = require("fs");
const path = require("path");

const productsController = {
  allProduct: function (req, res) {
    try {
      if (res.status(200)) {
        const readAllProduct = fs.readFileSync(
          "api/data/products.json",
          "utf-8"
        );
        const readAllProductParsered = JSON.parse(readAllProduct);
        res.send(readAllProductParsered);
      } else {
        res.status(500).send("Sever Error");
      }
    } catch (error) {
      res.send(error);
      console.log("Catch error" + error);
    }
  },

  oneProduct: function (req, res) {
    const porductByParams = req.params.id;

    try {
      if (res.status(200).res.send({ Msg: "Ok" })) {
        const readAllProduct = fs.readFileSync(
          "api/data/products.json",
          "utf-8"
        );
        const readAllProductParsered = JSON.parse(readAllProduct);
        res.send(readAllProductParsered);
      } else {
        res.status(500).res.json({ Msg: "Sever Error" });
      }
    } catch (error) {
      res.send(error);
      console.log("Catch error " + error);
    }
  },

  searchProduct: (req, res) => {
    try {
      let products = fs.readFileSync(
        path.join(__dirname, "../data/products.json"),
        "utf-8"
      );
      products = JSON.parse(products);
      const keyword = req.query.q;

      products.forEach((element) => {
        element.title = element.title.toLowerCase();
        element.description = element.description.toLowerCase();
        element.category = element.category.toLowerCase();
      });
      const productsFound = products.filter((product) => {
        return product.title.includes(keyword.toLowerCase());
      });
      console.log(productsFound);
      if (productsFound.length > 0) {
        res.send(productsFound);
      } else {
        res.status(404).send({ message: "No se encontraron productos" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error al obtener los productos" });
    }
  },
};

module.exports = productsController;

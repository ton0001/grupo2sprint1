const express = require('express')
const {json} = express
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
    const readAllProduct = fs.readFileSync("api/data/products.json", "utf-8");
    const readAllProductParsered = JSON.parse(readAllProduct);

    try {
      const filteredProduct = readAllProductParsered.filter((product) => {
        return product.id === Number(req.params.id);
      });
      if (filteredProduct === []) {
        res.status(404).json({
          ok: false,
          msg: "El producto no existe",
        });
      } else {
        res.status(200).json(filteredProduct);
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
      gallery: req.body.gallery,
      category: req.body.category,
      price: req.body.price,
      mostWanted: req.body.mostWanted,
      stock: req.body.stock
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
    const idProduct = req.params.id;

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

  mostWanted: function (req, res) {
    
    const readProducts = fs.readFileSync("api/data/products.json", "utf-8");
    const productParsered = JSON.parse(readProducts);

    try {
      
        const filteredProduct = productParsered.filter((product) => {
        return product.mostWanted === true;
      });
      
      res.status(200).json(filteredProduct)
      
      
    } catch (err) {
      
      console.log(err);
    }
  },
  getPicByProductId : (req, res) =>{
    try {
        let products = fs.readFileSync('/Users/diegogastongomez/Desktop/grupo2sprint1/api/data/products.json', 'utf-8');
        products = JSON.parse(products);

        let resp = products.find(elem => elem.id === parseInt(req.params.id));


        resp = resp.gallery;


        if(!resp){
            res.status(404).json({
                ok: false,
                msg: 'no existen coincidencias'
            });
        }else{
            res.status(200).json({
                ok: true,
                resp
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'server error'
        });
    }
  },
  listCategory: (req, res) => {
    let category = req.query.category;

    try{
      let dbProduct = fs.readFileSync(
        "api/data/products.json",
        "utf-8"
      );
      dbProduct = JSON.parse(dbProduct);

      let categoryFind = dbProduct.find(el => el.category.toLowerCase() === category.toLowerCase())
      
      if(categoryFind){
        let dbProductFilter = dbProduct.filter(el => el.category.toLowerCase() === category.toLowerCase());
        res.status(200).send(dbProductFilter);
      } else {
        res.status(404).json({
          msg: 'Not Found'
        })
      }
    } catch(err){
      console.log(err)
      res.status(500).json({
        msg: 'Error interno'
     });
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

      const productsFound = products.filter((product) => {
        return ( product.title.toLowerCase().includes(keyword.toLowerCase()) || 
        product.description.toLowerCase().includes(keyword.toLowerCase()) || 
        product.category.toLowerCase().includes(keyword.toLowerCase()) )
      });
      if (productsFound.length > 0) {
        res.send(productsFound);
      } else {
        res.status(404).send({ message: "No se encontraron productos" });
      }
    } catch (error) {
      res.status(500).send({ message: "Error al obtener los productos" });
    }
  },

  deleteProduct: (req, res) => {
    const { id } = req.params;
 
    try {
       const dataToParse = fs.readFileSync('./api/data/products.json', 'utf-8');
       const data = JSON.parse(dataToParse);

       const productdelete=data.find(el => el.id === Number(id))

       if(productdelete){
        const newData = data.filter(el => el.id !== Number(id));
        fs.writeFileSync('./api/data/products.json', JSON.stringify(newData));
        res.status(200).json({
              ok: true,
              msg: "producto eliminado con exito",
             });
       }
       else{
          res.status(404).json({
          ok: false,
          msg: "Product not found",
      });
       }
    }catch (error) {
       console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error de servidor",
       });
    }
 }

};

module.exports = productController;
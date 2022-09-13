
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
    }

}
module.exports = productController

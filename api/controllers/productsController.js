const fs = require('fs')
const getPicByProductId = (req, res) =>{
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


module.exports = {getPicByProductId};


const fs = require('fs')




const deleteProduct = (req, res) => {
    const { id } = req.params;
 
    try {
       const dataToParse = fs.readFileSync('./api/data/products.json', 'utf-8');
       const data = JSON.parse(dataToParse);
 
       const newData = data.filter(el => el.id !== Number(id));
       fs.writeFileSync('./api/data/products.json', JSON.stringify(newData));
       res.status(200).json({
            ok: true,
            msg: "producto eliminado con exito",
      });
 
    } catch (error) {
       console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error de servidor",
       });
    }
 }
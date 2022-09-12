const fs = require('fs')

//funcion que devuelve una imagen por el id de la misma
const getPictureById = (req, res) =>{

    try {
        let pictures = fs.readFileSync('/Users/diegogastongomez/Desktop/grupo2sprint1/api/data/gallery.json', 'utf-8');
        pictures = JSON.parse(pictures);
        
        const resp = pictures.find(elem => elem.id === parseInt(req.params.id))

        if(!resp){
            res.status(404).json({
                ok: false,
                msg: 'no existe imagen con tal id'
            })
        }
        else{
            res.status(200).json({
                ok: true,
                resp
            })
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'server error'
        });
    }


}

//funcion para crear una nueva picture
const createPic = (req, res) =>{
    try {
        let pictures = fs.readFileSync('/Users/diegogastongomez/Desktop/grupo2sprint1/api/data/gallery.json', 'utf-8');
        pictures = JSON.parse(pictures);

        const bodyId = req.body.id;
        const bodyUrl = req.body.url;
        const bodyDescription = req.body.description;

        if(!estanLosDatos(bodyId,bodyUrl,bodyDescription)){
            res.status(400).json({
                ok:false,
                msg:'todos los campos son requeridos'
            });
        }else{
            
            pictures.push({
                id: bodyId,
                url: bodyUrl,
                description: bodyDescription
            });
            res.status(200).json({
                ok: true,
                msg: 'imagen agregada'
            });
            fs.writeFileSync('/Users/diegogastongomez/Desktop/grupo2sprint1/api/data/gallery.json', JSON.stringify(pictures));
        }  
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'server error'
        });
    }
}   

//funcion que actualiza los datos de una picture
const updatePic = (req,res) =>{
    try { 
        const id = req.body.id;
        const url = req.body.url;
        const description = req.body.description;

        if(estanLosDatos(id, url, description)){
            res.status(200).json({
                ok: true,
                msg: 'imagen editada'
            });
        }
        else{
            res.status(400).json({
                ok:false,
                msg:'todos los campos son requeridos'
            });
        }


    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'server error'
        });
    }
}

//funcion para eliminar una picture
const deletePicture = (req, res) => {
    try {
        let pictures = fs.readFileSync('/Users/diegogastongomez/Desktop/grupo2sprint1/api/data/gallery.json', 'utf-8');
        pictures = JSON.parse(pictures);
        
        const resp = pictures.find(elem => elem.id === parseInt(req.params.id))

        if(!resp){
            
            res.status(404).json({
                ok: false,
                msg: 'no existe imagen con tal id'
            });
        }
        else{
            const nuevo = pictures.filter(elem => elem.id !== resp.id);
            pictures = nuevo;
            fs.writeFileSync('/Users/diegogastongomez/Desktop/grupo2sprint1/api/data/gallery.json', JSON.stringify(pictures));
            res.status(200).json({
                ok: true,
                msg: 'imagen eliminada con exito'
            })
            
        }



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'server error'
        });
    }
}



//funcion auxiliar
const estanLosDatos = (id, url, description) => {
    let ret = true;
    if(!id || !url || !description)
        ret = false;
    return ret;
}

module.exports = {
    createPic,
    updatePic,
    getPictureById,
    deletePicture
}

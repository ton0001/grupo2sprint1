const { verify } = require('crypto');
const fs = require('fs');
const jwt = require('jsonwebtoken');


const verifyRole = (req, res, next)=>{
    
    const { authorization: token } = req.headers;

    try{
        const dbUsers=fs.readFileSync('/Users/victoriacampiotti/Documents/grupo2sprint1/api/data/users.json', 'utf-8')
        const users=JSON.parse(dbUsers)

        const { id } = jwt.verify(token, process.env.JWT_PRIVATE);

        const user = users.find((user) => {
            return (user.id === Number(id));
        })

        if(user){
            req.body.id = user.id
            req.body.role=user.role
            next()

        }
        else{
            return res.status(403).json({
                ok: false,
                msg: "No autorizado"
             })
        }

    }
    catch(err){
        console.log(err);
        return res.status(401).json({
           ok: false,
           msg: "Token no valido"
        })
    }

}

const verifyGod = (req, res, next)=>{

    if (req.body.role === "GOD"){
        console.log("es dios")
        next()
    }
    else{
        console.log("no es god")
        return res.status(403).json({
            ok: false,
            msg: "No autorizado"
         })
    }
}

const verifyAdmin = (req, res, next)=>{

    if (req.body.role !== "ADMIN"){
        console.log("es adminstrador")
        next()
    }
    else{
        console.log("no es admin")
        return res.status(403).json({
            ok: false,
            msg: "No autorizado"
         })
    }

}

const verifyUsers = (req, res, next) => {

    if (req.body.id === Number(req.params.id)){
        console.log("Usuario coincide")
        next()
    }
    else{
        console.log("no coincide con el usuario logeafo")
        return res.status(403).json({
            ok: false,
            msg: "No autorizado"
         })
    }
}


module.exports = {verifyRole, verifyAdmin, verifyUsers, verifyGod};

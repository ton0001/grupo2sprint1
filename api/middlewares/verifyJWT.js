const jwt =  require('jsonwebtoken')

const verifyJWT = (req, res, next) =>{

    const {authorization: token} = req.headers
    try {

        req.body.tokenID= jwt.verify(token, process.env.JWT_PRIVATE).id
        next();
    }
    catch (err){ 
        console.log(err)
        return res.status(401).json({
            ok: false, 
            msg: "Token Invalido"
        })
    }
}

module.exports = verifyJWT  
const jwt =  require('jsonwebtoken')

const verifyJWT = (req, res, next) =>{

    const {authorization: token} = req.headers
    try {

        jwt.verify(token, process.env.JWT_PRIVATE)
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
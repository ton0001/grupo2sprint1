const jwt = require('jsonwebtoken')

const generateJWT = (payload = {} ) => {

    return new Promise( (resolve, reject) => {

        jwt.sign(payload, process.env.JWT_PRIVATE, {
            algorithm: 'HS512'
        }, (err, token)=> {
            if (err){
                console.log(err)
                reject('No se pudo crear el token');
            }

            resolve(token)
        })
    })

}


const extractToken = (req)=>{
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === "Bearer"){
        return req.headers.authorization.split(' ')[1]
    }
    return null
}


module.exports = { generateJWT }
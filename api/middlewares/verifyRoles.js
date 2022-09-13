const fs = require("fs");
const path = require("path");

/* Authentication middleware (roles = array roles autorizados)
    roles: [ 'GUESTID, 'GUEST', 'ADMINID', 'ADMIN', 'GOD  ]
*/
const isAuthenticated = (roles) => (req, res, next) => {
    
    getRole(req, res)

    switch (req.body.role){

        case "GOD":
            next();
        break

        case "ADMIN":
            if (roles.indexOf('ADMIN') !== -1) next()
            else if (roles.indexOf("ADMINID") !== -1){
                if (verifyUser(req)) next()
                else{
                    return res.status(403).json({
                        ok: false,
                        msg: "Unauthorized ID does not match with logged ID",
                    });
                }
            }
            else{
                return res.status(401).json({
                    ok: false,
                    msg: "Unauthorized",
                });
            }
        break

        case "GUEST":
            if (roles.indexOf('GUEST') !== -1) next()
            else if (roles.indexOf("GUESTID") !== -1){
                if (verifyUser(req)) next()
                else{
                    return res.status(403).json({
                        ok: false,
                        msg: "Unauthorized ID does not match with logged ID",
                    });
                }
            }
            else{
                return res.status(401).json({
                    ok: false,
                    msg: "Unauthorized",
                    });
            }
        break;
                
        default:
            return res.status(401).json({
                ok: false,
                msg: "Unauthorized",
            });
        break
    }
}


const verifyUser = (req)=>{
    console.log(Number(req.params.id) === Number(req.body.id))
    if (Number(req.params.id) === Number(req.body.id)) return true
    else return false
}

const getRole = (req, res) => {
    try {
        const ruta=path.join(__dirname, '..', 'data', 'users.json')
        const dbUsers = fs.readFileSync(ruta, "utf-8");
        const users = JSON.parse(dbUsers);
        
        const idToken = req.body.tokenID

        const user = users.find((user) => {
            return user.id === Number(idToken);
        });

        if (user) {
            req.body.id = user.id;
            req.body.role = user.role;
            return
            // next();
        } else {
            return res.status(403).json({
            ok: false,
            msg: "Usuario ID no encontrado",
            });
    }
    }catch (err) {
        console.log(err);
        return res.status(500).json({
        ok: false,
        msg: "Error de servidor",
        });
    }
};

module.exports = {isAuthenticated };

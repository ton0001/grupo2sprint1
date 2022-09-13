const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

// Authentication middleware (roles = array roles autorizados)
const isAuthenticated = (roles, IDverifiy = false) => (req, res, next) => {
    
    verifyRole(req, res)

    if (roles.indexOf(req.body.role) !== -1) {
        if (IDverifiy === false) next();
        else{
            if (req.body.role == "GOD") next();
            else{
                if (req.body.id === Number(req.params.id)) next();
                else
                    return res.status(403).json({
                        ok: false,
                        msg: "Unauthorized ID does not match with logged ID",
                    });
            }
        } 
    }else{
        return res.status(401).json({
            ok: false,
            msg: "Unauthorized",
        });
    }
};

const verifyRole = (req, res) => {
    const { authorization: token } = req.headers;

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
            msg: "No autorizado",
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

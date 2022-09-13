const express = require('express');
const {login} =  require('../controllers/usersControllers');
const verifyJWT = require('../middlewares/verifyJWT');
const { isAuthenticated} = require('../middlewares/verifyRoles');

const router = express.Router();


router.get('/:id', verifyJWT, isAuthenticated(['GUESTID', 'ADMIN', 'GOD']), (req, res, next)=>{
    res.send("Es el usuario tiene permisos para ver la pagina")
})
router.get('/', isAuthenticated(['ADMIN', 'GOD']), (req, res, next)=>{
    res.send("Es adminstrador o GOD")
})


router.post('/login', login);

module.exports = router;
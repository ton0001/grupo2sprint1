const express = require('express');
const {login} =  require('../controllers/usersControllers');
const verifyJWT = require('../middlewares/verifyJWT');
const { isAuthenticated} = require('../middlewares/verifyRole');

const router = express.Router();


router.get('/:id', verifyJWT, isAuthenticated(['GUEST', 'ADMIN', 'GOD'], true), (req, res, next)=>{
    res.send("Es el usuario correcto")
})
router.get('/', isAuthenticated(['ADMIN', 'GOD'], false), (req, res, next)=>{
    res.send("Es adminstrador o GOD")
})


router.post('/login', login);

module.exports = router;
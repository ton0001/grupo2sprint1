const express = require('express');
const {login} =  require('../controllers/usersControllers');
const {verifyRole, verifyAdmin, verifyUsers, verifyGod} = require('../middlewares/verifyRole');

const router = express.Router();

router.get('/:id', verifyRole, verifyUsers, (req, res, next)=>{
    res.send("Es el usuario correcto")
})
router.get('/', verifyRole, verifyGod, (req, res, next)=>{
    res.send("Es adminstrador o GOD")
})


router.post('/login', login);

module.exports = router;
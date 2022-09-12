require('dotenv').config()
const express = require('express');
const verifyJWT = require('./api/middlewares/verifyJWT.js');
const app = express()
const PORT = process.env.PORT;

const usersRoutes = require('./api/routes/usersRoutes.js')

app.use(express.json())


app.get('/api/v1', verifyJWT,  (req, res)=>{
    res.status(200).send("API funcionando correctamente")
})

app.use('/api/v1/users', usersRoutes)


app.listen(PORT, ()=> {
    console.log(`server corriendo en ${PORT}`)
})


require('dotenv').config()
const express = require('express');
const verifyJWT = require('./api/middlewares/verifyJWT.js');
const app = express()
const PORT = process.env.PORT;

//Routes
const usersRoutes = require('./api/routes/usersRoutes.js')

//Controllers
const {login} =  require('./api/controllers/usersControllers');


app.use(express.json())


app.get('/api/v1', verifyJWT,  (req, res)=>{
    res.status(200).send("API funcionando correctamente")
})


app.use('/api/v1/users', usersRoutes)

//Alias para LOGIN
app.post('/api/v1/login', login)


app.listen(PORT, ()=> {
    console.log(`server corriendo en ${PORT}`)
})


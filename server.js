require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

const productRoutes = require("./api/routes/productsRoutes");
const usersRoutes = require("./api/routes/usersRoutes");
const pictureRoutes = require('./api/routes/pictureRoutes')
const cartRoutes = require('./api/routes/cartsRoutes')


// const {login} =  require('./api/controllers/usersController');


app.use(express.json());

app.get('/api/v1',  (req, res)=>{ res.status(200).send("API funcionando correctamente")})

app.use('/api/v1/products',productRoutes)
app.use('/api/v1/pictures',pictureRoutes)
app.use('/api/v1/carts', cartRoutes)
app.use('/api/v1/user', usersRoutes);



app.listen(PORT, ()=> {
    console.log(`server corriendo en ${PORT}`)
})



require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT;
const pictureRoutes = require('./api/routes/pictureRoutes')
const productsRoutes = require('./api/routes/productsRoutes')

app.use(express.json())
app.use('/api/v1/pictures',pictureRoutes)
app.use('/api/v1/products',productsRoutes)

app.listen(PORT, ()=> {
    console.log(`server corriendo en ${PORT}`)
})


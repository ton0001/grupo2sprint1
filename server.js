require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT;
const productRoutes = require('./api/routes/productsRoutes')

app.use(express.json())
app.use('/api/v1' , productRoutes)


app.listen(PORT, ()=> {
    console.log(`server corriendo en ${PORT}`)
})


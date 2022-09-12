require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT;
const pictureRoutes = require('./api/routes/pictureRoutes')

app.use(express.json())
app.use('/api/v1/pictures',pictureRoutes)

app.listen(PORT, ()=> {
    console.log(`server corriendo en ${PORT}`)
})


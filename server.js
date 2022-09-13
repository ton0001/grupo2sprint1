require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

const productRoutes = require("./api/routes/productsRoutes");
const usersRoutes = require("./api/routes/usersRoutes");
const pictureRoutes = require('./api/routes/pictureRoutes')
const cartRoutes = require('./api/routes/cartsRoutes')

app.use(express.json());
app.use('/api/v1/products',productRoutes)
app.use('/api/v1/pictures',pictureRoutes)
app.use('/api/v1/carts', cartRoutes)
app.use('/api/v1/user', usersRoutes);

app.listen(PORT, () => {
  console.log(`server corriendo en ${PORT}`);
});

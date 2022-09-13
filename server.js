require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const productRoutes = require("./api/routes/productsRoutes");
const usersRoutes = require("./api/routes/usersRoutes");

app.use(express.json());
app.use("/api/v1", productRoutes);
app.use("/api/v1", usersRoutes);

app.listen(PORT, () => {
  console.log(`server corriendo en ${PORT}`);
});

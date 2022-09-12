const express = require("express");
const router = express.Router();
const { getUsers, login } = require("../controllers/usersController");

router.get("/users", getUsers);
// router.get("/users/:id");
// router.post("/users");
// router.put("/users/:id");
// router.delete("/users/:id");
// router.post("/login", login);

module.exports = router;

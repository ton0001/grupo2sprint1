const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login
} = require("../controllers/usersController");
const verifyJWT = require('../middlewares/verifyJWT');
const { isAuthenticated} = require('../middlewares/verifyRoles');

router.get("/", verifyJWT, getUsers);
router.get("/:id", verifyJWT, isAuthenticated(['GUESTID', 'ADMIN', 'GOD']), getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post('/login', login);


module.exports = router;




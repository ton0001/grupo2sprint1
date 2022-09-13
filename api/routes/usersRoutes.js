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

const cartsController = require('../controllers/cartsController');

const verifyJWT = require('../middlewares/verifyJWT');
const {isAuthenticated} = require('../middlewares/verifyRoles');

router.get("/", verifyJWT, isAuthenticated(['GOD', 'ADMIN']), getUsers);
router.get('/:id/cart', cartsController.listCart);
router.get("/:id", verifyJWT, isAuthenticated(['GOD', 'ADMIN', 'GUESTID']), getUserById);
router.post("/", createUser);
router.put('/:id/cart', cartsController.updateCart);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post('/login', login);






module.exports = router;




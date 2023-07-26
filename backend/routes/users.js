const express = require("express");

// controller functions
const {
  createUser,
  getallUser,
  getoneUser,
  deleteUser,
  updateUser,
  deleteAllUser,
  loginUser,
  signupUser,
} = require("../controllers/userController");

const router = express.Router();


// GET all User
router.get("/", getallUser);

// GET single User
router.get("/:id", getoneUser);

// POST new User
router.post("/", createUser);

// // DELETE all User
router.delete("/deleteAll", deleteAllUser);

// DELETE a User
// router.delete("/:id", deleteUser);

// UPDATE a User
router.patch("/:id", updateUser);

// login user
router.post("/login", loginUser);

// Signup user
router.post("/signup", signupUser);


module.exports = router;

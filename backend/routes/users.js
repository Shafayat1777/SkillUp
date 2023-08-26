const express = require("express");
const { uploadImage, validateImage } = require("../middleware/fileUpload");
const requireAuth = require("../middleware/requireAuth");

// controller functions
const {
  getallUser,
  getoneUser,
  deleteUser,
  updateUser,
  deleteAllUser,
  loginUser,
  signupUser,
  setProgressUser,
  getProgress,
  uploadFile,
} = require("../controllers/userController");

const router = express.Router();

// login user
router.post("/login", loginUser);

// Signup user
router.post("/signup", signupUser);

// check for authentication ///
router.use(requireAuth);

// GET all User
router.get("/", getallUser);

// GET single User
router.get("/:id", getoneUser);

// // DELETE all User
// router.delete("/deleteAll", deleteAllUser);

// DELETE a User
router.delete("/:id", deleteUser);

// set User progress
router.patch("/setProgress", setProgressUser);

// UPDATE a User
router.patch("/:id", updateUser);

// Get user Progress
router.get("/user/userProgress", getProgress);

//upload
router.post("/upload", uploadImage.single("image"), validateImage, uploadFile);

module.exports = router;

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
  updateProgressContent,
  updateProgressQuiz,
  updateProfilePic,
  deleteProfilePic,
  updateUserStatus,
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

// Get user Progress given courseId
router.get("/user/userProgress/:id", getProgress);

// update user content progress
router.patch("/updateContentProgress", updateProgressContent)

// update user quiz progress
router.patch("/updateQuizProgress", updateProgressQuiz)

// UPDATE a User
router.patch("/:id", updateUser);

//update profile pic
router.patch("/user/updatePic", uploadImage.single("profile_pic"), validateImage, updateProfilePic);

// update user quiz progress
router.patch("/user/deletePic", deleteProfilePic)

// update user status
router.patch("/user/userStatus/:id", updateUserStatus)

module.exports = router;

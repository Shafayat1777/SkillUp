const express = require("express");
const {
  createCourse,
  getallCourse,
  getoneCourse,
  deleteCourse,
  updateCourse,
  enrollCourse,
  deleteAllCourse,
} = require("../controllers/courseController");

const router = express.Router();

// GET all courses
router.get("/", getallCourse);

// GET single courses
router.get("/:id", getoneCourse);

// POST new courses
router.post("/", createCourse);

// // DELETE all courses
router.delete("/deleteAll", deleteAllCourse);

// DELETE a courses
// router.delete("/:id", deleteCourse);

// UPDATE a courses
router.patch("/:id", updateCourse);

// Enroll a courses
router.patch("/enrolls/enrol", enrollCourse);

module.exports = router;

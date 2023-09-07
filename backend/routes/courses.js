const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const { uploadPDF, validatePDF, uploadVideo } = require("../middleware/fileUpload");

const {
  createCourse,
  getallCourse,
  getmyCourse,
  getoneCourse,
  deleteCourse,
  updateCourse,
  enrollCourse,
  enrolledCourses,
  createLesson,
  getallLesson,
  getoneLesson,
  deleteLesson,
  deleteAllCourse,
  addContent,
  getAllContent,
  addQuiz,
  updateCourseStatus,
  addComment,
  getAllCoursesByCategory,
  getAllCoursesBySearch
} = require("../controllers/courseController");

const router = express.Router();



// GET all courses
router.get("/courses", getallCourse); // Use a unique identifier, e.g., "/courses" instead of "/"

// GET all courses by catagory
router.get("/coursesBycategory/:category", getAllCoursesByCategory);

// GET all courses by search
router.get("/coursesBysearch/:search", getAllCoursesBySearch);

// GET single course
router.get("/courses/:id", getoneCourse); // Adjust the route for getting a single course as well

// check for authentication
router.use(requireAuth);
// GET all courses
router.get("/mycourses", getmyCourse); // Use a unique identifier, e.g., "/courses" instead of "/"

// POST new course
router.post("/courses", createCourse); // Adjust the route for creating a new course

// DELETE a course
router.delete("/courses/:id", deleteCourse); // Adjust the route for deleting a course

// UPDATE a course
router.patch("/courses/:id", updateCourse); // Adjust the route for updating a course

// Create a lesson
router.post("/lessons", createLesson); // Use "/lessons" instead of "/lesson"

// GET all lessons
router.get("/lessons", getallLesson); // Use "/lessons" instead of "/lesson"

// GET a single lesson
router.get("/lessons/:id", getoneLesson); // Adjust the route for getting a single lesson

// DELETE a lesson
router.delete("/lessons/:id", deleteLesson); // Adjust the route for deleting a lesson

// Create a PDF content file
router.post("/contents/file/pdf", uploadPDF.single("file"), validatePDF, addContent); // Use "/lessons" instead of "/lesson"

// Create a Video content file
router.post("/contents/file/video", uploadVideo.single("file"), addContent); // Use "/lessons" instead of "/lesson"

// Create a Video content file
router.post("/contents/link/video", addContent); // Use "/lessons" instead of "/lesson"

// GET all content
router.get("/contents", getAllContent); // Use "/lessons" instead of "/lesson"

// Create a quiz
router.post("/quiz", addQuiz); // Use "/lessons" instead of "/lesson"

//Enroll a course
router.patch("/enroll", enrollCourse); // Adjust the route for enrolling a course

//Enroll a course
router.get("/enrolled", enrolledCourses); // Adjust the route for enrolling a course

// update course status
router.patch("/course/updateCourseStatus/:id", updateCourseStatus);

// add a comment
router.post("/comment", addComment);

// DELETE all courses
// router.delete("/courses/deleteAll", deleteAllCourse); // If you want to keep the delete all courses route, use a unique identifier like "/courses/deleteAll"


module.exports = router;

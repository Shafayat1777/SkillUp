const prisma = require("../prisma/prisma");
const fs = require("fs");

// get all Course
const getallCourse = async (req, res) => {
  try {
    const data = await prisma.courses.findMany({
      include: {
        teacher: {
          select: {
            first_name: true,
            last_name: true,
            about: true,
            email: true,
            role: true,
            institute: true,
            designation: true,
            socials: true,
          },
        },
        lessons: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            contents: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single Course
const getoneCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await prisma.courses.findUnique({
      where: {
        id: id,
      },
      include: {
        teacher: {
          select: {
            first_name: true,
            last_name: true,
            about: true,
            email: true,
            role: true,
            institute: true,
            designation: true,
            socials: true,
          },
        },
        lessons: {
          orderBy: {
            createdAt: "asc",
          },
          include: {
            contents: {
              orderBy: {
                createdAt: "asc",
              },
            },
            quiz: {
              orderBy: {
                createdAt: "asc",
              },
            },
          },
        },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new Course
const createCourse = async (req, res) => {
  const { title, short_description, description, category, userId } = req.body;

  // add data to db
  try {
    if (!title || !short_description || !description) {
      throw Error("All fields must me filled!");
    }
    if (!userId) {
      throw Error("Must be signin to add course!");
    }

    const data = await prisma.courses.create({
      data: {
        title: title,
        short_description: short_description,
        description: description,
        category: category,
        teacher: { connect: { id: userId } }, // Step 2: Associate the course with the teacher (user)
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a Course
const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the course with the specified ID to get the related lessons
    const course = await prisma.courses.findUnique({
      where: {
        id: id,
      },
      include: {
        lessons: {
          include: {
            contents: true,
          },
        },
      },
    });

    // If the course does not exist, return or throw an error
    if (!course) {
      console.log("Course not found");
      return;
    }

    // Delete the contents related to the lessons
    for (const lesson of course.lessons) {
      const contentIds = lesson.contents.map((content) => {
        const filePath = content.file;
        const startIndex = filePath.indexOf("uploads");
        // Extract the part of the string starting from "uploads" to the end
        const extractedString = "../backend/" + filePath.slice(startIndex);

        fs.unlink(extractedString, (err) => {
          if (err) {
            console.log("Error deleting the file:", err);
          } else {
            console.log("File deleted successfully.");
          }
        });

        return content.id;
      });

      await prisma.contents.deleteMany({
        where: {
          id: {
            in: contentIds,
          },
        },
      });
    }

    // Delete the lessons related to the course
    const lessonIds = course.lessons.map((lesson) => lesson.id);
    await prisma.lessons.deleteMany({
      where: {
        id: {
          in: lessonIds,
        },
      },
    });

    // Delete the course itself
    await prisma.courses.delete({
      where: {
        id: id,
      },
    });

    // Return a success message or response as needed
    res.json({
      messg: "Course and related lessons/contents deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the course." });
  }
};

// delete all Course
const deleteAllCourse = async (req, res) => {
  try {
    const data = await prisma.courses.deleteMany({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a Course
const updateCourse = async (req, res) => {
  const { id } = req.params;

  // update data to db
  try {
    const data = await prisma.courses.update({
      where: {
        email: id,
      },
      data: req.body,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// add a lesson
const createLesson = async (req, res) => {
  const { lesson_title, lesson_description, courseId } = req.body;

  // add data to db
  try {
    if (!lesson_title || !lesson_description) {
      throw Error("All fields must me filled!");
    }

    const course = await prisma.courses.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      throw Error("No such course exists!");
    }

    const data = await prisma.lessons.create({
      data: {
        title: lesson_title,
        description: lesson_description,
        courseId: courseId,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all lesson
const getallLesson = async (req, res) => {
  try {
    const data = await prisma.lessons.findMany({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single lesson
const getoneLesson = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await prisma.lessons.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a lesson
const deleteLesson = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await prisma.lessons.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// add a content
const addContent = async (req, res) => {
  const { content_title, lessonId, link } = req.body;
  var videoLink = "";
  // get the file path
  if (req.file) {
    const filePath = req.file.path;
    // Find the index of the "uploads" substring
    const startIndex = filePath.indexOf("uploads");
    // Extract the part of the string starting from "uploads" to the end
    videoLink =
      "http://localhost:4000/" + filePath.slice(startIndex).replace(/\\/g, "/");
  } else {
    if (link) {
      // Check if the link is a YouTube link
      const youtubeMatch = link.match(
        /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/
      );
      if (youtubeMatch) {
        const youtubeVideoId = youtubeMatch[1];
        videoLink = `https://www.youtube.com/embed/${youtubeVideoId}`;
      } else {
        // Handle other types of links or invalid YouTube links
        // You might want to provide an error message or default behavior here
        videoLink = link;
      }
    }
  }

  // add data to db
  try {
    if (!content_title || !lessonId || !videoLink) {
      throw Error("All fields must me filled!");
    }

    const lesson = await prisma.lessons.findUnique({
      where: {
        id: lessonId,
      },
    });

    if (!lesson) {
      throw Error("No such lessons exists!");
    }

    const data = await prisma.contents.create({
      data: {
        title: content_title,
        file: videoLink,
        lessonsId: lessonId,
      },
    });

    res.status(200).json({ messg: "File uploaded" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all content
const getAllContent = async (req, res) => {
  try {
    const data = await prisma.contents.findMany({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// enroll a Course
const enrollCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  // update data to db
  try {
    const data = await prisma.courses.update({
      where: { id: userId },
      data: { courses: { connect: { id: courseId } } },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// add quiz
const addQuiz = async (req, res) => {
  const { quizTitle, quizLessoneId, quiz, userId } = req.body;

  quiz.map((data) => {
    console.log(data);
  });

  // try {
  //   if (!quizTitle || !quiz) {
  //     throw Error("All fields must me filled!");
  //   }
  //   if (!userId) {
  //     throw Error("Must be signin to add course!");
  //   }

  //   const data = await prisma.quiz.create({
  //     data: {
  //       title: quizTitle,
  //       questions: JSON.stringify(quiz),
  //       lessonsId: quizLessoneId, // Replace with the actual lessonsId
  //     },
  //   });
  //   console.log(data);
  //   res.status(200).json("A Quiz has been added");
  // } catch (error) {
  //   res.status(400).json({ error: error.message });
  // }
};

module.exports = {
  createCourse,
  getallCourse,
  getoneCourse,
  deleteCourse,
  updateCourse,
  createLesson,
  getallLesson,
  getoneLesson,
  deleteLesson,
  enrollCourse,
  deleteAllCourse,
  addContent,
  getAllContent,
  addQuiz,
};

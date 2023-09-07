const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const fs = require("fs");

// create jwt token
const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: "3d" });
};

// get all users
const getallUser = async (req, res) => {
  try {
    const data = await prisma.user.findMany({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single user
const getoneUser = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res
      .status(200)
      .json(
        "Successfully deleted user:",
        data.first_name + " " + data.last_name_name
      );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete all user
const deleteAllUser = async (req, res) => {
  try {
    const data = await prisma.user.deleteMany({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { socials } = req.body;

  // update data to db
  try {
    if (socials.social1) {
      if (!validator.isURL(socials.social1)) {
        throw Error("Social links must be actual links!");
      } else if (!socials.social1.includes("github.com")) {
        throw Error(
          "Link added is not from Github! Please add Github profile link"
        );
      }
    }
    if (socials.social2) {
      if (!validator.isURL(socials.social2)) {
        throw Error("Social links must be actual links!");
      } else if (!socials.social2.includes("facebook.com")) {
        throw Error(
          "Link added is not from Facebook! Please add Facebook profile link"
        );
      }
    }
    if (socials.social3) {
      if (!validator.isURL(socials.social3)) {
        throw Error("Social links must be actual links!");
      } else if (!socials.social3.includes("linkedin.com")) {
        throw Error(
          "Link added is not from LinkedIn! Please add LinkedIn profile link"
        );
      }
    }
    if (socials.social4) {
      if (!validator.isURL(socials.social4)) {
        throw Error("Social links must be actual links!");
      } else if (!socials.social4.includes("youtube.com")) {
        throw Error(
          "Link added is not from Youtube! Please add Youtube profile link"
        );
      }
    }

    const data = await prisma.user.update({
      where: {
        id,
      },
      data: req.body,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get progress
const getProgress = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  try {
    // get the users progress
    const userProgress = await prisma.user.findUnique({
      where: { id: userId },
      select: { progress: true }, // Select only the progress field
    });

    let foundProgress = false;
    let foundprog = {};
    // check is the progess field has any data. if it does then find the course progress
    if (userProgress.progress.length !== 0) {
      userProgress.progress.map((progress) => {
        if (progress.courseId === id) {
          // console.log(progress);
          foundprog = progress;
          foundProgress = true;
        }
      });

      if (foundProgress) res.status(200).json(foundprog);
      else {
        console.log(
          "progress of this course is not added. Please enroll the course"
        );
        res.status(200).json(foundprog);
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// set user progress
const setProgressUser = async (req, res) => {
  const userId = req.user.id;

  // update data to db
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { progress: true }, // Select only the progress field
    });

    // Check if the user has existing progress data
    let updatedProgress = user.progress || [];
    // console.log(updatedProgress);

    res.status(200).json("Progress has been set");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update user content progress
const updateProgressContent = async (req, res) => {
  const userId = req.user.id;
  const { courseId, lessonId, contentId } = req.body;

  // update data to db
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { progress: true }, // Select only the progress field
    });

    // Check if the user has existing progress data
    let data = user.progress || [];

    // check if the data arrat is empty or not
    if (data.length > 0) {
      // Find the course with the given courseId
      const course = data.find((course) => course.courseId === courseId);

      if (course) {
        // Find the lesson with the given lessonId within the course
        const lesson = course.lessons.find(
          (lesson) => lesson.lessonId === lessonId
        );

        if (lesson) {
          // Find the content with the given contentId within the lesson
          const content = lesson.contents.find(
            (content) => content.contentId === contentId
          );

          if (content) {
            // Update the checked property to true
            if (content.clicked === false) content.clicked = true;
          }
          // console.log(content);
        }
      }

      const checkedContentCount = data
        .find((course) => course.courseId === courseId)
        .lessons.reduce(
          (count, lesson) => {
            if (lesson.contents) {
              lesson.contents.forEach((content) => {
                count.content++;
                if (content.clicked === true) {
                  count.clicked++;
                }
              });
            }
            return count;
          },
          { clicked: 0, content: 0 }
        );

      const checkedQuizCount = data
        .find((course) => course.courseId === courseId)
        .lessons.reduce(
          (count, lesson) => {
            if (lesson.quiz) {
              lesson.quiz.forEach((quiz) => {
                count.quiz++;
                if (quiz.clicked === true) {
                  count.clicked++;
                }
              });
            }
            return count;
          },
          { clicked: 0, quiz: 0 }
        );

      const TotalClicked =
        checkedContentCount.clicked + checkedQuizCount.clicked;
      const TotalCount = checkedContentCount.content + checkedQuizCount.quiz;

      // console.log(TotalClicked, TotalCount)
      if (course) {
        course.totalClicked = TotalClicked;
        course.totalCount = TotalCount;
        console.log(course);
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          progress: data,
        },
      });
      res.status(200).json("Progress has been Updated");
    } else {
      res.status(200).json("Initial Progress has Not been Set yet");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update user quiz progress
const updateProgressQuiz = async (req, res) => {
  const userId = req.user.id;
  const { courseId, lessonId, quizId, quizScore, totalScore } = req.body;

  // update data to db
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { progress: true }, // Select only the progress field
    });

    // Check if the user has existing progress data
    let data = user.progress || [];

    // check if the data arrat is empty or not
    if (data.length > 0) {
      // Find the course with the given courseId
      const course = data.find((course) => course.courseId === courseId);

      if (course) {
        // Find the lesson with the given lessonId within the course
        const lesson = course.lessons.find(
          (lesson) => lesson.lessonId === lessonId
        );

        if (lesson) {
          // Find the quiz with the given quizId within the lesson
          const quiz = lesson.quiz.find((quiz) => quiz.quizId === quizId);

          if (quiz) {
            // Update the checked property to true
            if (quiz.quizScore === "" || quiz.quizScore < quizScore)
              quiz.quizScore = quizScore;
            if (quiz.clicked === false && quiz.quizScore === totalScore)
              quiz.clicked = true;
          }
          // console.log(quiz);
        }
      }

      const checkedContentCount = data
        .find((course) => course.courseId === courseId)
        .lessons.reduce(
          (count, lesson) => {
            if (lesson.contents) {
              lesson.contents.forEach((content) => {
                count.content++;
                if (content.clicked === true) {
                  count.clicked++;
                }
              });
            }
            return count;
          },
          { clicked: 0, content: 0 }
        );

      const checkedQuizCount = data
        .find((course) => course.courseId === courseId)
        .lessons.reduce(
          (count, lesson) => {
            if (lesson.quiz) {
              lesson.quiz.forEach((quiz) => {
                count.quiz++;
                if (quiz.clicked === true) {
                  count.clicked++;
                }
              });
            }
            return count;
          },
          { clicked: 0, quiz: 0 }
        );

      const TotalClicked =
        checkedContentCount.clicked + checkedQuizCount.clicked;
      const TotalCount = checkedContentCount.content + checkedQuizCount.quiz;

      // console.log(TotalClicked, TotalCount)
      if (course) {
        course.totalClicked = TotalClicked;
        course.totalCount = TotalCount;
        console.log(course);
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          progress: data,
        },
      });
      res.status(200).json("Progress has been Updated");
    } else {
      res.status(200).json("Initial Progress has Not been Set yet");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // validation
    if (!email || !password) {
      throw Error("All fields must me filled!");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw Error("Incorrect email!");
    }

    // compare passwrod
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Incorrect password!");
    }

    // create a token
    const token = createToken(user.id);

    res.status(200).json({
      id: user.id,
      role: user.role,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_pic: user.profile_pic,
      isBlocked: user.isBlocked,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { firstName, lastName, email, password, socials, role } = req.body;
  try {
    // validation
    if (!firstName || !lastName || !email || !password || !role) {
      throw Error("All fields must me filled!");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid!");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error(
        "Password is not strong enough! Must Contain a degit, symbol, capital and small letter"
      );
    }

    // check if the user already exists
    const exists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (exists) {
      throw Error("Email already in use!");
    }

    // get salt
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // add user to db
    const data = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hash,
        socials,
        role,
      },
    });

    // create a token
    const token = createToken(data.id);

    res.status(200).json({
      id: data.id,
      role: data.role,
      fist_name: data.first_name,
      profile_pic: data.profile_pic,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//upload
const updateProfilePic = async (req, res) => {
  const userId = req.user.id;
  var profile_pic = "";

  try {
    if (req.file) {
      const filePath = req.file.path;
      // Find the index of the "uploads" substring
      const startIndex = filePath.indexOf("uploads");
      // Extract the part of the string starting from "uploads" to the end
      profile_pic =
        "http://localhost:4000/" +
        filePath.slice(startIndex).replace(/\\/g, "/");
    } else {
      throw Error("Must add an Image!");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const oldpic = user.profile_pic;
    if (oldpic) {
      // delete the existing pic
      const startIndex = oldpic.indexOf("uploads");
      // Extract the part of the string starting from "uploads" to the end
      const extractedString = "../backend/" + oldpic.slice(startIndex);
      fs.unlink(extractedString, (err) => {
        if (err) {
          console.log("Error deleting the Pic:", err);
        } else {
          console.log("Pic deleted successfully.");
        }
      });
    }

    const data = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profile_pic,
      },
    });

    res.status(200).json({ mssg: "Image Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const deleteProfilePic = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    const oldpic = user.profile_pic;
    if (oldpic) {
      // delete the existing pic
      const startIndex = oldpic.indexOf("uploads");
      // Extract the part of the string starting from "uploads" to the end
      const extractedString = "../backend/" + oldpic.slice(startIndex);
      fs.unlink(extractedString, (err) => {
        if (err) {
          console.log("Error deleting the Pic:", err);
        } else {
          console.log("Pic deleted successfully.");
        }
      });
    }

    const data = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profile_pic: "",
      },
    });

    res.status(200).json({ mssg: "Image Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

const updateUserStatus = async (req, res) => {
  const { id } = req.params;
  const { userStatus } = req.body;

  try {
    const data = await prisma.user.update({
      where: {
        id,
      },
      data: {
        isBlocked: userStatus,
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getallUser,
  getoneUser,
  deleteUser,
  updateUser,
  deleteAllUser,
  loginUser,
  signupUser,
  getProgress,
  setProgressUser,
  updateProgressContent,
  updateProgressQuiz,
  updateProfilePic,
  deleteProfilePic,
  updateUserStatus,
};

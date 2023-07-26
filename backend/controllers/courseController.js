const { PrismaClient } = require("@prisma/client");

// connect to db
const prisma = new PrismaClient();

// get all Course
const getallCourse = async (req, res) => {
  try {
    const data = await prisma.courses.findMany({
        include: {
            students: true,
        }
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
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new Course
const createCourse = async (req, res) => {
  const { title, description, total_hours, userId } = req.body;

  // add data to db
  try {
    const data = await prisma.courses.create({
      data: {
        title: title,
        description: description,
        total_hours: total_hours,
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
    const data = await prisma.courses.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

module.exports = {
  createCourse,
  getallCourse,
  getoneCourse,
  deleteCourse,
  updateCourse,
  enrollCourse,
  deleteAllCourse,
};

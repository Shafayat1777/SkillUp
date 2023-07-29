const prisma = require('../prisma/prisma');

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
    }
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create new Course
const createCourse = async (req, res) => {
  const { title, short_description, description, userId } = req.body;

  // add data to db
  try {
    if (!title || !short_description ||!description) {
      throw Error("All fields must me filled!");
    }
    if(!userId){
      throw Error("Must be signin to add course!");
    }

    const data = await prisma.courses.create({
      data: {
        title: title,
        short_description: short_description,
        description: description,
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

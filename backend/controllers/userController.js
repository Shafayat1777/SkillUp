const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// create jwt token
const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.SECRET, { expiresIn: "3d" });
};

// connect to db
const prisma = new PrismaClient();

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

// create new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  // add data to db
  try {
    const data = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
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
    res.status(200).json(data);
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

  // update data to db
  try {
    const data = await prisma.user.update({
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

// login user
const loginUser = async (req, res) => {
  const { name, email, password } = req.body;

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

    res.status(200).json({ id:user.id, email:user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const {email, password } = req.body;
  try {
    // validation
    if (!email || !password) {
      throw Error("All fields must me filled!");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid!");
    }
    if (!validator.isStrongPassword(password)) {
      throw Error("Password is not strong enough!");
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
        email: email,
        password: hash,
      },
    });

    // create a token
    const token = createToken(data.id);

    res.status(200).json({ id: data.id, email: data.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getallUser,
  getoneUser,
  deleteUser,
  updateUser,
  deleteAllUser,
  loginUser,
  signupUser,
};

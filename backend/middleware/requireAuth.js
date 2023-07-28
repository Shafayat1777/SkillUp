const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prisma.js");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    // verify the token
    const { id } = jwt.verify(token, process.env.SECRET);

    req.user = await prisma.user.findUnique({
      where: {
        id
      },
    });
  

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = requireAuth;

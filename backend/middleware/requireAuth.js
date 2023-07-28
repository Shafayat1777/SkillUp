const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const requireAuth = async (req, res, next) => {
  // get authorization token from headers
  const { authorization } = req.headers;

 

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // get the token
  const token = authorization.split(" ")[1];

  try {
    // verify the token
    const { id } = jwt.verify(token, process.env.SECRET);

    // connect to db
    const prisma = new PrismaClient();

    req.user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    next();
  } catch (error) {

    res.status(401).json({ error: "Request in not authorized" });
  }
};

module.exports = requireAuth

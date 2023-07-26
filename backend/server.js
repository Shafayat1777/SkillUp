require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");


// express app
const app = express();

// middeleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on port!", process.env.PORT);
});

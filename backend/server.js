require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users");
const courseRoutes = require("./routes/courses");
const path = require('path'); // Add this line


// express app
const app = express();

// middeleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// Testing API

app.use('/',(req,res) => {

  console.log("hello")
  res.json({"msg":"Hello"})

});

// Serve static files from "backend/uploads" folder
app.use('/uploads', express.static(path.join('uploads')));

// routes
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
  console.log("listening on port! http://localhost:"+process.env.PORT);
});

const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db/index");
const jwt = require("jsonwebtoken");
const jwtPassword = "anant_server";
// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  username = req.headers.username;
  password = req.headers.password;
  await Admin.create({
    username: username,
    password: password,
  });
  res.json({
    message: "Admin created successfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.headers.username;
  const password = req.headers.password;
  try {
    const admin = await Admin.find({
      username: username,
      password: password,
    });
    if (admin) {
      console.log("username: " + username);
      const token = jwt.sign({ username: username }, jwtPassword);
      res.status(200).json({
        token,
      });
    }
  } catch {
    res.status(403).json({
      msg: "Admin doesnt exist in our in memory db",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const newCourse = await Course.create({
    title: req.body.title,
    description: req.body.description,
    imageLink: req.body.imageLink,
    price: req.body.price,
  });
  res.json({
    message: "Course created successfully",
    courseId: newCourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

module.exports = router;

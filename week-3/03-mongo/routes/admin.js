const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin } = require("../db/index");
const { Course } = require("../db/index");

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

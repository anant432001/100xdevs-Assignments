const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db/index");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  await User.create({
    username: req.headers.username,
    password: req.headers.password,
  });
  res.json({
    message: "User created successfully",
  });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;
  User.updateOne(
    {
      username: username,
    },
    {
      $push: { purchasedCourses: courseId },
    }
  ).catch(function (e) {
    console.log("error: " + e);
    res.status(403).json({ message: "Error occured" });
  });
  res.status(200).json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = await User.findOne({
    username: req.headers.username,
  });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });

  res.json({
    Courses: courses,
  });
});

module.exports = router;

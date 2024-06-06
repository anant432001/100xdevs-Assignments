const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwtPassword = "anant_server";
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  username = req.headers.username;
  password = req.headers.password;
  await User.create({
    username: username,
    password: password,
  });
  res.json({
    message: "User created successfully",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.headers.username;
  const password = req.headers.password;
  try {
    const user = await User.find({
      username: username,
      password: password,
    });
    if (user) {
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

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const response = await Course.find({});
  res.json({
    courses: response,
  });
});

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  // Implement course purchase logic
  try {
    User.updateOne(
      {
        username: req.headers.username,
      },
      {
        $push: {
          purchasedCourses: req.params.courseId,
        },
      }
    );
    res.status(200).json({
      message: "Course purchase success",
    });
  } catch {
    res.status(404).json({
      message: "Can not purchase",
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const username = req.headers.username;
  const user = await User.findOne({
    username: username,
  });
  const courses = await Course.find({
    _id: {
      $in: user.purchasedCourses,
    },
  });
  res.status(200).send({
    courses: courses,
  });
});

module.exports = router;

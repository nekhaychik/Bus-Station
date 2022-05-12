const express = require("express");

const { body } = require("express-validator");

const router = express.Router();

const User = require("../models/user");

const authController = require("../controllers/auth");

router.post(
  "/signup",
  [
    body("name").trim().not().isEmpty(),
    body("phone")
      .isMobilePhone()
      .withMessage("Please enter a valid phone.")
      .custom(async (phone) => {
        const user = await User.find(phone);
        if (user[0].length > 0) {
          return Promise.reject("Phone already exist!");
        }
      }),
    body("hash").trim().isLength({ min: 7 }),
    body("role").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;

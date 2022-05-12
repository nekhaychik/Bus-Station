const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;

  const name = req.body.name;
  const phone = req.body.phone;
  const hash = req.body.hash;
  const role = req.body.role;

  try {
    const hashedPassword = await bcrypt.hash(hash, 12);

    const userDetails = {
      name: name,
      phone: phone,
      hash: hashedPassword,
      role: role,
    };

    const result = await User.save(userDetails);

    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const phone = req.body.phone;
  const hash = req.body.hash;

  try {
    const user = await User.find(phone);

    if (user[0].length !== 1) {
      const error = new Error("A user with this phone could not be found.");
      error.statusCode = 401;
      throw error;
    }

    const storedUser = user[0][0];

    const isEqual = await bcrypt.compare(hash, storedUser.hash);

    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        phone: storedUser.phone,
        userId: storedUser.id,
      },
      "secretfortoken",
      { expiresIn: '1h' }
    );

    res.status(200).json({ token: token, userId: storedUser.id })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
};

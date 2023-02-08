// import the user model
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");

// create a user signup controller
exports.userSignUp = async (req, res) => {
  const { first_name, last_name, email, password } = req.body; // destructuring

  try {
    // input validation
    if (!(first_name && last_name && email && password)) {
      return res.status(400).json({
        // 400 - Bad request
        error: "Please input all fields",
      });
    }

    // check if user already exist
    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist)
      return res.status(409).json({
        error: "user already exist",
      });

    // hash password
    const salt = 10; // const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashPassword,
      first_name,
      last_name,
    });

    console.log(user.email);
    // send email
    await sendEmail({
      email: user.email,
      subject: "Welcome to Wakanda",
      message: "Welcome to Wakanda",
      html: `<h1>Welcome to Wakanda</h1>`,
    });

    return res.status(201).json({
      message: "user created successfully",
      id: user._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Login user
exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // input validation
    if (!(email && password))
      return res.status(400).json({
        error: "All fields are required",
      });

    // check if user is in db
    const userExist = await User.findOne({ email });

    if (!userExist)
      return res.status(404).json({
        error: "User not found",
      });

    // verify password is correct
    const isMatchedPassword = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isMatchedPassword)
      return res.status(400).json({
        error: "Invalid credentials",
      });
    // store our payload inside jwt
    const token = await jwt.sign(
      {
        email: userExist.email,
        id: userExist._id,
        first_name: userExist.first_name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "5m", // m , d,  ==> 1m, 5m, 1d, 2d, 30d, 1yr
      }
    );

    // store response inside a cookie
    res.cookie("access_token", token, {
      expires: new Date(Date.now() + 30000), // 30000 means 3minutes
      httpOnly: true,
    });

    // console.log(token);
    return res.status(202).json({
      message: "user logged in successfully",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.userProfile = async (req, res) => {
  try {
    console.log(req.user);
    const id = req.user.id;

    // find the user by the id coming from token
    const user = await User.findById(id);
    return res.status(200).json({
      message: "user profile page",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// send bulk email to all users
exports.sendBulkEmail = async (req, res) => {
  try {
    const id = req.user.id;

    console.log(id);

    const userRole = await User.findById(id);

    if (userRole.role !== "admin")
      //
      return res.status(401).json({
        error: "Unauthorized you are not an admin",
      });

    // get all users
    const users = await User.find(); // request

    for (let i = 0; i < users.length; i++) {
      console.log(users[i].email);
      await sendEmail({
        // 0        1    2
        email: users[i].email, // ["timi", "tayo", "richest"]
        subject: "Welcome to Wakanda",
        message: "Welcome to Wakanda",
        html: `<h1>Welcome to Wakanda</h1>`,
      });
    }

    return res.status(200).json({
      message: "email sent successfully",
    }); // response
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

// change a user to admin
exports.changeRole = async (req, res) => {
  try {
    const { id } = req.user;

    // check if user exists in db using id
    const user = await User.findById(id);

    if (!user)
      return res.status(404).json({
        error: "user not found",
      });
    
    // update user role
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
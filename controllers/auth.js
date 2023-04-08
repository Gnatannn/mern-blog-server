import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { SECRET_KEY } = process.env;

//Register user
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });

    if (isUsed) {
      return res.status(402).json({
        message: "This username is already in use",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({
      newUser,
      message: "Registration successful",
    });
  } catch (error) {
    res.json({ message: "Error of registration controller" });
  }
};

//Login userSelect:
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        message: "There is no such username",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      //   SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
      message: "You have logined successful",
    });
  } catch (error) {
    res.json({ message: "Error of authorization in controller login" });
  }
};

//GetMe
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.json({
        message: "There is no such username",
      });
    }

    // token will be the same
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY,
      //   SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.json({
      token,
      user,
    });
  } catch (error) {
    res.json({ message: "Not authorized in controller getMe" });
  }
};

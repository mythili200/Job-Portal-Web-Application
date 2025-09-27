const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already Exist or email ID already in use",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      createdAt: new Date(),
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      data: newUser,
      message: "User Registered Successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const Match = await bcrypt.compare(password, user.password);
    if (!Match) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Credentials" });
    }
    const token = jwt.sign(
      { _id: user?._id, role: user?.role },
      process.env.SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      success: true,
      token,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      msg: "User Login Successfull",
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(user?.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(200).json({ success: true, data: error?.message });
  }
};
module.exports = { registerUser, userLogin, getProfile };

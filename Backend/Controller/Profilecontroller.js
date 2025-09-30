const User = require("../Models/UserModel");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, phone, location, linkedin, bio, skills } = req.body;
    const updateData = { name, phone, location, linkedin, bio, skills };

    if (req.files) {
      if (req.files.profilePhoto && req.files.profilePhoto[0]) {
        updateData.profilePhoto = req.files.profilePhoto[0].path;
      }
      if (req.files.resume && req.files.resume[0]) {
        updateData.resume = req.files.resume[0].path;
      }
    }
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updateData, {
      new: true,
    }).select("-password");

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getProfile, updateProfile };

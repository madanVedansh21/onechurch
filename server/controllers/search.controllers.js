import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import ChurchModel from "../models/church.model.js";

export const search = asyncHandler(async (req, res) => {
  const { q, type } = req.query; // type: 'users' or 'churches'

  if (!q) {
    return res.status(200).json({ results: [] });
  }

  const regex = new RegExp(q, "i");
  let results = [];

  if (type === "users") {
    results = await User.find({
      $or: [{ fullName: regex }, { email: regex }],
    }).select("fullName profilePic email role");
  } else {
    // Default to churches
    results = await ChurchModel.find({
      name: regex,
    }).select("name profilePic address isVerified");
  }

  return res.status(200).json({ results });
});

import mongoose from "mongoose";

const churchSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Church name must be at least 2 characters"],
      maxlength: [200, "Church name cannot exceed 200 characters"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    address: {
      type: String,
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
      match: [
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
        "Please enter a valid contact number",
      ],
    },
    website: {
      type: String,
      trim: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followerCount: {
      type: Number,
      default: 0,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ChurchModel = mongoose.model("Church", churchSchema);
export default ChurchModel;

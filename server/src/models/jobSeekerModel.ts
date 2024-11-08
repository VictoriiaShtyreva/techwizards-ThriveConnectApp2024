import mongoose, { Schema, Document } from "mongoose";
import { IJobSeeker } from "../interfaces/IJobSeeker";

const jobSeekerSchema = new Schema<IJobSeeker>({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [100, "Password cannot exceed 100 characters"],
  },
  role: {
    type: String,
    default: "jobseeker",
  },
  skills: {
    type: [String],
    required: [true, "Skills are required"],
    validate: {
      validator: function (skills: string[]) {
        return skills.length > 0;
      },
      message: "At least one skill must be provided",
    },
  },
  position: {
    type: String,
    required: [true, "Position is required"],
    minlength: [2, "Position must be at least 2 characters long"],
    maxlength: [100, "Position cannot exceed 100 characters"],
    trim: true,
  },
  experience: {
    type: String,
  },
  wellBeingPreferences: {
    type: [String],
    required: [true, "Well-being preferences are required"],
    validate: {
      validator: function (preferences: string[]) {
        return preferences.length > 0;
      },
      message: "At least one well-being preference must be provided",
    },
  },
  skills_summary: {
    type: String,
    trim: true,
    maxlength: [1000, "Skills summary cannot exceed 1000 characters"],
  },
  wellBeingPreferences_summary: {
    type: String,
    trim: true,
    maxlength: [
      1000,
      "Well-being preferences summary cannot exceed 1000 characters",
    ],
  },
  skills_embedding: {
    type: [Number],
    default: [],
    validate: {
      validator: function (embedding: number[]) {
        return (
          embedding.length === 0 ||
          embedding.every((num) => typeof num === "number")
        );
      },
      message: "Skills embedding must be an array of numbers",
    },
  },
  wellBeingPreferences_embedding: {
    type: [Number],
    default: [],
    validate: {
      validator: function (embedding: number[]) {
        return (
          embedding.length === 0 ||
          embedding.every((num) => typeof num === "number")
        );
      },
      message: "Well-being preferences embedding must be an array of numbers",
    },
  },
});

// JSON serialization for jobSeekerSchema
jobSeekerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password; // Do not expose password
  },
});

export const JobSeekerModel = mongoose.model<IJobSeeker>(
  "JobSeeker",
  jobSeekerSchema
);

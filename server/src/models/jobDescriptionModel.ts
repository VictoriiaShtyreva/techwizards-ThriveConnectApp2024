import mongoose, { Schema, Document } from "mongoose";
import { IJobDescription } from "../interfaces/IJobDescription";

const jobDescriptionSchema = new Schema<IJobDescription>({
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: [true, "Company ID is required"],
  },
  title: {
    type: String,
    required: [true, "Job title is required"],
    trim: true,
  },
  skillsRequired: {
    type: [String],
    required: [true, "Skills are required"],
  },
  experienceRequired: {
    type: String,
    required: [true, "Experience is required"],
  },
  jd_summary: {
    type: String,
  },
  jd_embedding: {
    type: [Number],
    default: [],
    validate: {
      validator: function (embedding: number[]) {
        return (
          embedding.length === 0 ||
          embedding.every((num) => typeof num === "number")
        );
      },
      message: "Job description embedding must be an array of numbers",
    },
  },
});

export const JobDescriptionModel = mongoose.model<IJobDescription>(
  "JobDescription",
  jobDescriptionSchema
);

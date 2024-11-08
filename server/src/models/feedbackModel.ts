import mongoose, { Schema } from "mongoose";
import { IMatch } from "../interfaces/IMatch";

const matchSchema = new Schema<IMatch>({
  jobSeekerId: {
    type: Schema.Types.ObjectId,
    ref: "JobSeeker",
    required: [true, "Job seeker ID is required"],
  },
  jobDescriptionId: {
    type: Schema.Types.ObjectId,
    ref: "JobDescription",
    required: [true, "Job description ID is required"],
  },
  skillScore: {
    type: Number,
    required: [true, "Skill score is required"],
    min: [0, "Skill score must be at least 0"],
    max: [100, "Skill score cannot exceed 100"],
  },
  valueScore: {
    type: Number,
    required: [true, "Value score is required"],
    min: [0, "Value score must be at least 0"],
    max: [100, "Value score cannot exceed 100"],
  },
  finalScore: {
    type: Number,
    required: [true, "Final score is required"],
    min: [0, "Final score must be at least 0"],
    max: [100, "Final score cannot exceed 100"],
  },
});

// JSON serialization for matchSchema
matchSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const MatchModel = mongoose.model<IMatch>("Match", matchSchema);

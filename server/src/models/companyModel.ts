import mongoose, { Schema } from "mongoose";
import { ICompany } from "../interfaces/ICompany";

const companySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: [true, "Company name is required"],
    minlength: [2, "Company name must be at least 2 characters long"],
    maxlength: [100, "Company name cannot exceed 100 characters"],
    trim: true,
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
    validate: {
      validator: function (value: string) {
        // Custom validator to ensure the password contains numbers and letters
        return /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
      },
      message: "Password must contain at least one letter and one number",
    },
  },
  role: {
    type: String,
    default: "company", // Set role to 'company' by default
    enum: {
      values: ["company"], // Only 'company' is allowed as a valid role
      message: "{VALUE} is not a valid role",
    },
  },
  companyCulture: {
    type: String,
    required: [true, "Company culture is required"],
    minlength: [10, "Company culture must be at least 10 characters long"],
    maxlength: [1000, "Company culture cannot exceed 1000 characters"],
    trim: true,
  },
  wellBeingMetrics: {
    type: String,
    required: [true, "Well-being metrics are required"],
    minlength: [10, "Well-being metrics must be at least 10 characters long"],
    maxlength: [1000, "Well-being metrics cannot exceed 1000 characters"],
    trim: true,
  },
  jobDescriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: "JobDescription",
    },
  ],
  companyValue_summary: {
    type: String,
    trim: true,
    maxlength: [500, "Company value summary cannot exceed 500 characters"],
  },
  companyValue_embedding: {
    type: [Number],
    default: [],
    validate: {
      validator: function (embedding: number[]) {
        return (
          embedding.length === 0 ||
          embedding.every((num) => typeof num === "number")
        );
      },
      message: "Company value embedding must be an array of numbers",
    },
  },
});

// JSON serialization for companySchema
companySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password; // Do not expose password
  },
});

export const CompanyModel = mongoose.model<ICompany>("Company", companySchema);

import {
  ApiError,
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "../errors/ApiError";
import { ICompany } from "../interfaces/ICompany";
import { IJobSeeker } from "../interfaces/IJobSeeker";
import { CompanyModel } from "../models/companyModel";
import { JobSeekerModel } from "../models/jobSeekerModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const authenticateUser = async (
  email: string,
  password: string,
  role: "jobseeker" | "company"
): Promise<string | null> => {
  try {
    let user: IJobSeeker | ICompany | null;

    // Check role and find the user in the appropriate collection
    if (role === "jobseeker") {
      user = await JobSeekerModel.findOne({ email });
    } else if (role === "company") {
      user = await CompanyModel.findOne({ email });
    } else {
      throw new BadRequestError("Invalid role specified");
    }

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return token;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError("Failed to authenticate user");
  }
};

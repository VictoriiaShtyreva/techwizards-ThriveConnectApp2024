import bcrypt from "bcrypt";
import { ICompany } from "../interfaces/ICompany";
import {
  ApiError,
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../errors/ApiError";
import { CompanyModel } from "../models/companyModel";
import { IJobDescription } from "../interfaces/IJobDescription";

// Service to create a company
export const createCompany = async (
  companyData: ICompany
): Promise<ICompany> => {
  try {
    const { email, password } = companyData;

    // Check if the email is already in use
    const existingCompany = await CompanyModel.findOne({ email });
    if (existingCompany) {
      throw new BadRequestError("Email is already in use");
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new company with the hashed password
    const company = new CompanyModel({
      ...companyData,
      password: hashedPassword,
    });
    return await company.save();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError("Failed to create company");
  }
};

// Service to get a company by ID
export const getCompanyById = async (id: string): Promise<ICompany | null> => {
  try {
    const company = await CompanyModel.findById(id).populate("jobDescriptions");
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    return company;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError("Failed to retrieve company");
  }
};

// Service to update a company's profile
export const updateCompanyProfile = async (
  id: string,
  updateData: Partial<ICompany>
): Promise<ICompany | null> => {
  try {
    if (updateData.password) {
      // Hash the new password if provided
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );
    if (!updatedCompany) {
      throw new NotFoundError("Company not found");
    }
    return updatedCompany;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError("Failed to update company profile");
  }
};

// Service to add a job description to a company
export const addJobDescription = async (
  companyId: string,
  jobDescriptionId: IJobDescription["_id"]
): Promise<ICompany | null> => {
  try {
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    company.jobDescriptions.push(jobDescriptionId);
    return await company.save();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError("Failed to add job description to company");
  }
};

// Service to delete a company by ID
export const deleteCompanyById = async (
  id: string
): Promise<ICompany | null> => {
  try {
    const company = await CompanyModel.findByIdAndDelete(id);
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    return company;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError("Failed to delete company");
  }
};

// Service to fetch all companies with pagination
export const fetchAllCompaniesWithPagination = async (
  page: number,
  limit: number
): Promise<{ companies: ICompany[]; total: number }> => {
  try {
    const skip = (page - 1) * limit;

    // Apply pagination using skip and limit
    const companies = await CompanyModel.find()
      .populate("jobDescriptions")
      .skip(skip)
      .limit(limit)
      .exec();

    // Get total number of companies for pagination info
    const total = await CompanyModel.countDocuments().exec();

    return { companies, total };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError(
      "Failed to retrieve companies with pagination"
    );
  }
};

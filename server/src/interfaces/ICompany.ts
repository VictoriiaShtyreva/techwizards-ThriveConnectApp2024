import { Document } from "mongoose";

export interface ICompany extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  companyCulture: string;
  wellBeingMetrics: string;
  jobTitle: string;
  skillsRequired: string[];
  experienceRequired: string;
  companyProfile_summary: string;
  companyProfile_embedding: Number[];
}

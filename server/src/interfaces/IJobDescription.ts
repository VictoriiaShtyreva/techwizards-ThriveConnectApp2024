import { Document } from "mongoose";

export interface IJobDescription extends Document {
  companyId: string;
  title: string;
  skillsRequired: string[];
  experienceRequired: string;
  jd_summary: string;
  jd_embedding: Number[];
}

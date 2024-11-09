import { Document } from "mongoose";

export interface IJobSeeker extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  skills: string[];
  position: string;
  experience: string;
  wellBeingPreferences: string[];
  jobSeekerProfile_summary: string;
  jobSeekerProfile_embedding: Number[];
}

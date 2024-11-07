import { Document } from "mongoose";
import { IJobDescription } from "./IJobDescription";

export interface ICompany extends Document {
  name: string;
  companyCulture: string;
  wellBeingMetrics: string;
  jobDescriptions: IJobDescription["_id"][];
  companyValue_summary: string;
  companyValue_embedding: Number[];
}

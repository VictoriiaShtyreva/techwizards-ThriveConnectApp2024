import mongoose from "mongoose";

export interface IMatch extends Document {
  companyId: mongoose.Types.ObjectId;
  jobDescriptionId: mongoose.Types.ObjectId;
  skillScore: number;
  valueScore: number;
  finalScore: number;
}

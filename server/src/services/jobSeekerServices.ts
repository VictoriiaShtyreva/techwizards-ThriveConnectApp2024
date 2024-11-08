import { JobSeekerModel } from "../models/jobSeekerModel";
import { IJobSeeker } from "../interfaces/IJobSeeker";
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from "../errors/ApiError";

import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import {
  createSkillOfJobSeekerSummary,
  createWellBeingPreferencesSummary,
} from "../langchain/summaries/summarizeJobseeker";

const llm = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: "qwertyuiopasdfghjklzxcvbnm123456",
});

export const createJobSeeker = async (
  jobSeekerData: Partial<IJobSeeker>
): Promise<IJobSeeker> => {
  const {
    name,
    email,
    password,
    role,
    skills,
    position,
    experience,
    wellBeingPreferences,
  } = jobSeekerData;

  if (
    !name ||
    !email ||
    !password ||
    !role ||
    !skills ||
    !position ||
    !experience ||
    !wellBeingPreferences
  ) {
    throw new BadRequestError("Missing required fields");
  }

  const existingJobSeeker = await JobSeekerModel.findOne({ email });

  if (existingJobSeeker) {
    throw new BadRequestError("Email already exists");
  }

  try {
    const skillsSummary = await createSkillOfJobSeekerSummary(jobSeekerData);
    const wellBeingPreferencesSummary = await createWellBeingPreferencesSummary(
      jobSeekerData
    );

    const skillsEmbeddings = await llm.embedQuery(skillsSummary);
    const wellBeingPreferencesEmbeddings = await llm.embedQuery(
      wellBeingPreferencesSummary
    );

    // Create a new Job Seeker
    const newJobSeeker = new JobSeekerModel({
      name,
      email,
      password,
      role,
      skills,
      position,
      experience,
      wellBeingPreferences,
      skills_summary: skillsSummary,
      wellBeingPreferences_summary: wellBeingPreferencesSummary,
      skills_embedding: skillsEmbeddings,
      wellBeingPreferences_embedding: wellBeingPreferencesEmbeddings,
    });

    return await newJobSeeker.save();
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

// Get All Job Seekers
export const getAllJobSeekers = async (): Promise<IJobSeeker[]> => {
  try {
    return await JobSeekerModel.find({});
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

// Get Job Seeker by ID
export const getJobSeekerById = async (id: string): Promise<IJobSeeker> => {
  try {
    const jobSeeker = await JobSeekerModel.findById(id);
    if (!jobSeeker) {
      throw new NotFoundError("Job Seeker not found");
    }
    return jobSeeker;
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

// Update Job Seeker by ID
export const updateJobSeekerById = async (
  id: string,
  jobSeekerData: Partial<IJobSeeker>
): Promise<IJobSeeker> => {
  try {
    const jobSeeker = await JobSeekerModel.findById(id);
    if (!jobSeeker) {
      throw new NotFoundError("Job Seeker not found");
    }

    const {
      name,
      email,
      password,
      role,
      skills,
      position,
      experience,
      wellBeingPreferences,
    } = jobSeekerData;

    if (
      !name ||
      !email ||
      !password ||
      !role ||
      !skills ||
      !position ||
      !experience ||
      !wellBeingPreferences
    ) {
      throw new BadRequestError("Missing required fields");
    }

    const skillsSummary = await createSkillOfJobSeekerSummary(jobSeekerData);

    const wellBeingPreferencesSummary = await createWellBeingPreferencesSummary(
      jobSeekerData
    );

    const skillsEmbeddings = await llm.embedQuery(skillsSummary);

    const wellBeingPreferencesEmbeddings = await llm.embedQuery(
      wellBeingPreferencesSummary
    );

    jobSeeker.name = name;
    jobSeeker.email = email;
    jobSeeker.password = password;
    jobSeeker.role = role;
    jobSeeker.skills = skills;
    jobSeeker.position = position;
    jobSeeker.experience = experience;
    jobSeeker.wellBeingPreferences = wellBeingPreferences;
    jobSeeker.skills_summary = skillsSummary;
    jobSeeker.wellBeingPreferences_summary = wellBeingPreferencesSummary;
    jobSeeker.skills_embedding = skillsEmbeddings;
    jobSeeker.wellBeingPreferences_embedding = wellBeingPreferencesEmbeddings;

    return await jobSeeker.save();
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

// Delete Job Seeker by ID
export const deleteJobSeekerById = async (id: string): Promise<void> => {
  try {
    const jobSeeker = await JobSeekerModel.findByIdAndDelete(id);
    if (!jobSeeker) {
      throw new NotFoundError("Job Seeker not found");
    }
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

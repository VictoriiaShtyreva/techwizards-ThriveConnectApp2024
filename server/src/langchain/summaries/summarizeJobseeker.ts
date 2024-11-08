import { IJobSeeker } from "../../interfaces/IJobSeeker";

// TODO: Create embeddings for each job seeker record
export async function createSkillOfJobSeekerSummary(
  jobseeker: Partial<IJobSeeker>
): Promise<string> {
  return new Promise(async (resolve) => {
    const jobSeekerDetails = `${jobseeker.name} is a ${
      jobseeker.position
    } with ${jobseeker.experience} years of experience. Skills: ${(
      jobseeker.skills ?? []
    ).join(", ")}.`;
    resolve(jobSeekerDetails);
  });
}


// TODO: Create embeddings for each well-being preference record
export async function createWellBeingPreferencesSummary(
  jobseeker: Partial<IJobSeeker>
): Promise<string> {
  return new Promise(async (resolve) => {
    const wellBeingPreferences = `Well-being preferences of ${
      jobseeker.name
    }: ${(jobseeker.wellBeingPreferences ?? []).join(", ")}`;
    resolve(wellBeingPreferences);
  });
}

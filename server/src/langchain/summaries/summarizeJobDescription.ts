import {IJobDescription} from "../../interfaces/IJobDescription";

export async function createJobDescriptionSummary(
    jobDescription: Partial<IJobDescription>
): Promise<string> {
    return new Promise(async (resolve) => {
        const jobDescriptionSummary = `Job description of ${jobDescription.title}
        has a skill requirement ${jobDescription.skillsRequired}
        and experience requirement of ${jobDescription.experienceRequired}`;
        resolve(jobDescriptionSummary);
    });
}
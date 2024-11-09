import { FeedbackModel } from "../models/feedbackModel";
import { CompanyModel } from "../models/companyModel";
import { IFeedback } from "../interfaces/IFeedback";
import { NotFoundError, InternalServerError } from "../errors/ApiError";

// Service to add feedback for a company
export const addFeedback = async (
  companyId: string,
  feedbackData: Partial<IFeedback>
): Promise<IFeedback> => {
  try {
    const company = await CompanyModel.findById(companyId);
    if (!company) {
      throw new NotFoundError("Company not found");
    }

    // Create feedback
    const feedback = new FeedbackModel({
      companyId,
      feedbackText: feedbackData.feedbackText,
      sentimentScore: feedbackData.sentimentScore,
    });
    await feedback.save();

    // Update company's feedback list
    company.feedback.push(feedback._id);
    await company.save();

    return feedback;
  } catch (error) {
    throw new InternalServerError("Failed to add feedback");
  }
};

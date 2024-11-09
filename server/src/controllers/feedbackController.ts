import { Request, Response, NextFunction } from "express";
import { addFeedback } from "../services/feedbackService";

// Controller to handle feedback submission
export const submitFeedback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.params;
    const { feedbackText, sentimentScore } = req.body;

    if (!feedbackText || sentimentScore === undefined) {
      return res.status(400).json({ error: "Feedback text and sentiment score are required" });
    }

    const feedback = await addFeedback(companyId, { feedbackText, sentimentScore });
    return res.status(201).json(feedback);
  } catch (error) {
    next(error);
  }
};

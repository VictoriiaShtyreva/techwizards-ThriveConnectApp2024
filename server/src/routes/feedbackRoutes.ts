import { Router } from "express";
import { submitFeedback } from "../controllers/feedbackController";

const router = Router();

// POST /feedback/:companyId - Add feedback to a specific company
router.post("/:companyId", submitFeedback);

export default router;

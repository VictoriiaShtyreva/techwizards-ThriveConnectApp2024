import { Router } from "express";
import {
  createJobSeekerController,
  getAllJobSeekersController,
  getJobSeekerByIdController,
  updateJobSeekerByIdController,
  deleteJobSeekerByIdController,
} from "../controllers/jobSeekerControllers";

const router = Router();

router.post("/", createJobSeekerController);
router.get("/", getAllJobSeekersController);
router.get("/:id", getJobSeekerByIdController);
router.patch("/:id", updateJobSeekerByIdController);
router.delete("/:id", deleteJobSeekerByIdController);

export default router;

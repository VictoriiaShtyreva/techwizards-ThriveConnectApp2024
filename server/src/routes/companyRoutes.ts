import express from "express";

import { tokenMiddleware } from "../middleware/tokenMiddleware";
import { authorizeRoles } from "../middleware/authMiddleware";
import {
  addJobDescriptionHandler,
  createCompanyHandler,
  deleteCompanyHandler,
  getAllCompaniesWithPaginationHandler,
  getCompanyByIdHandler,
  updateCompanyProfileHandler,
} from "../controllers/companyControllers";

const router = express.Router();

router.post("/", createCompanyHandler);
router.get(
  "/:id",
  tokenMiddleware,
  authorizeRoles(["company"]),
  getCompanyByIdHandler
);
router.put(
  "/:id",
  tokenMiddleware,
  authorizeRoles(["company"]),
  updateCompanyProfileHandler
);
router.post(
  "/:id/job-description",
  tokenMiddleware,
  authorizeRoles(["company"]),
  addJobDescriptionHandler
);
router.delete(
  "/:id",
  tokenMiddleware,
  authorizeRoles(["company"]),
  deleteCompanyHandler
);
router.get("/", getAllCompaniesWithPaginationHandler);

export default router;

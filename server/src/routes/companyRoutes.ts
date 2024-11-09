import express from "express";

import {
  createCompanyHandler,
  deleteCompanyHandler,
  getAllCompanies,
  getCompanyByIdHandler,
  updateCompanyProfileHandler,
} from "../controllers/companyControllers";

const router = express.Router();

router.post("/", createCompanyHandler);
router.get("/:id", getCompanyByIdHandler);
router.put("/:id", updateCompanyProfileHandler);
router.delete("/:id", deleteCompanyHandler);
router.get("/", getAllCompanies);

export default router;

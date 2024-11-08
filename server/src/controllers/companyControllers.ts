import { Request, Response, NextFunction } from "express";
import {
  addJobDescription,
  createCompany,
  deleteCompanyById,
  fetchAllCompaniesWithPagination,
  getCompanyById,
  updateCompanyProfile,
} from "../services/companyServices";

// Controller to create a company
export const createCompanyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const company = await createCompany(req.body);
    res.status(201).json(company);
  } catch (error) {
    next(error);
  }
};

// Controller to get a company by ID
export const getCompanyByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const company = await getCompanyById(req.params.id);
    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

// Controller to update a company's profile
export const updateCompanyProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedCompany = await updateCompanyProfile(req.params.id, req.body);
    res.status(200).json(updatedCompany);
  } catch (error) {
    next(error);
  }
};

// Controller to add a job description to a company
export const addJobDescriptionHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { jobDescriptionId } = req.body;
    const updatedCompany = await addJobDescription(
      req.params.id,
      jobDescriptionId
    );
    res.status(200).json(updatedCompany);
  } catch (error) {
    next(error);
  }
};

// Controller to delete a company by ID
export const deleteCompanyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedCompany = await deleteCompanyById(req.params.id);
    res.status(200).json(deletedCompany);
  } catch (error) {
    next(error);
  }
};

// Controller to fetch all companies with pagination
export const getAllCompaniesWithPaginationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1; // Default to page 1
  const limit = parseInt(req.query.limit as string) || 10; // Default to limit 10

  try {
    const { companies, total } = await fetchAllCompaniesWithPagination(
      page,
      limit
    );
    res.status(200).json({ companies, total, page, limit });
  } catch (error) {
    next(error);
  }
};

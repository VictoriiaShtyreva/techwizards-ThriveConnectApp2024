import { ICompany } from "../../interfaces/ICompany";

export async function createCompanyValueSummary(
    company: Partial<ICompany>
): Promise<string> {
    return new Promise(async (resolve) => {
        const companyDetails = `Company ${company.name} has a culture of ${company.companyCulture}
        and wellbeing metrics of ${company.wellBeingMetrics}.`;
        resolve(companyDetails);
    });
}
import type { Company } from "../entities/company.entity";

export interface ICompanyRepository {
	create(company: Company): Promise<void>;
	getByName(name: string): Promise<Company | null>;
}

import type { ICompanyRepository } from "@/modules/company/domain/repositories/company.repository";
import type { IExampleRepository } from "@/modules/example/domain/repositories/example.repository";

export abstract class UnitOfWorkContextService {
	public abstract example: IExampleRepository;
	public abstract company: ICompanyRepository;
}

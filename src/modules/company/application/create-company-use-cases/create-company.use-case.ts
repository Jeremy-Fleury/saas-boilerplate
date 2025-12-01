import type { IIdService } from "@/common/uuid/domain/services/id.service";

import { Company } from "../../domain/entities/company.entity";
import type { ICompanyRepository } from "../../domain/repositories/company.repository";

export interface ICreateCompanyUseCaseProps {
	name: string;
}

export class CreateCompanyUseCase {
	public constructor(
		private readonly _idService: IIdService,
		private readonly _companyRepository: ICompanyRepository,
	) {}

	public async execute(input: ICreateCompanyUseCaseProps): Promise<Company> {
		const company = Company.create({
			id: this._idService.generateUuidV7(),
			name: input.name,
		});

		await this._companyRepository.create(company);

		return company;
	}
}

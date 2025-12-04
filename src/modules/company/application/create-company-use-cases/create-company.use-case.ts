import { RessourceAlreadyExistsApplicationError } from "@/common/errors/domain/application.error";
import type { UnitOfWorkService } from "@/common/database/domain/services/unit-of-work.service";
import type { IIdService } from "@/common/uuid/domain/services/id.service";

import { Company } from "../../domain/entities/company.entity";

export interface ICreateCompanyUseCaseProps {
	name: string;
}

/**
 * Create Company Use Case
 *
 * @description Create a new company
 * @param input - Input data
 * @returns Company
 * @throws ValidationError if company name is already taken
 */
export class CreateCompanyUseCase {
	public constructor(
		private readonly _idService: IIdService,
		private readonly _unitOfWork: UnitOfWorkService,
	) {}

	public async execute(input: ICreateCompanyUseCaseProps): Promise<Company> {
		return await this._unitOfWork.execute(async (context): Promise<Company> => {
			const company = Company.create({
				id: this._idService.generateUuidV7(),
				name: input.name,
			});

			const isCompanyNameAlreadyTaken = await context.company.getByName(company.name.value);

			if (isCompanyNameAlreadyTaken) {
				throw new RessourceAlreadyExistsApplicationError("Company name already taken");
			}

			context.company.create(company);

			return company;
		});
	}
}

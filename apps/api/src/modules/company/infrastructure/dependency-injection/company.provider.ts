import type { Provider } from "@nestjs/common";

import { PRISMA_UNIT_OF_WORK_TOKEN } from "@/common/database/infrastructure/dependency-injection/database.token";
import { UUID_SERVICE_TOKEN } from "@/common/uuid/infrastructure/dependency-injection/uuid.token";
import type { UnitOfWorkService } from "@/common/database/domain/services/unit-of-work.service";
import type { IIdService } from "@/common/uuid/domain/services/id.service";

import { CreateCompanyUseCase } from "../../application/create-company-use-cases/create-company.use-case";
import { COMPANY_CREATE_COMPANY_USE_CASE_TOKEN } from "./company.token";

// Use Cases

export const COMPANY_CREATE_COMPANY_USE_CASE_PROVIDER: Provider<CreateCompanyUseCase> = {
	inject: [UUID_SERVICE_TOKEN, PRISMA_UNIT_OF_WORK_TOKEN],
	provide: COMPANY_CREATE_COMPANY_USE_CASE_TOKEN,
	useFactory: (idService: IIdService, unitOfWork: UnitOfWorkService) => {
		return new CreateCompanyUseCase(idService, unitOfWork);
	},
};

import type { Provider } from "@nestjs/common";

import { PRISMA_UNIT_OF_WORK_TOKEN } from "@/common/database/infrastructure/dependency-injection/database.token";
import { UUID_SERVICE_TOKEN } from "@/common/uuid/infrastructure/dependency-injection/uuid.token";
import type { UnitOfWorkService } from "@/common/database/domain/services/unit-of-work.service";
import type { IIdService } from "@/common/uuid/domain/services/id.service";

import { CreateExampleUseCase } from "../../application/create-example-use-cases/create-example.use-case";
import { GetExampleUseCase } from "../../application/get-example-use-cases/get-example.use-case";
import { EXAMPLE_CREATE_EXAMPLE_USE_CASE_TOKEN, EXAMPLE_GET_EXAMPLE_USE_CASE_TOKEN } from "./example.token";

// Use Cases

export const EXAMPLE_CREATE_EXAMPLE_USE_CASE_PROVIDER: Provider<CreateExampleUseCase> = {
	inject: [UUID_SERVICE_TOKEN, PRISMA_UNIT_OF_WORK_TOKEN],
	provide: EXAMPLE_CREATE_EXAMPLE_USE_CASE_TOKEN,
	useFactory: (idService: IIdService, unitOfWork: UnitOfWorkService) => {
		return new CreateExampleUseCase(idService, unitOfWork);
	},
};

export const EXAMPLE_GET_EXAMPLE_USE_CASE_PROVIDER: Provider<GetExampleUseCase> = {
	inject: [PRISMA_UNIT_OF_WORK_TOKEN],
	provide: EXAMPLE_GET_EXAMPLE_USE_CASE_TOKEN,
	useFactory: (unitOfWork: UnitOfWorkService) => {
		return new GetExampleUseCase(unitOfWork);
	},
};

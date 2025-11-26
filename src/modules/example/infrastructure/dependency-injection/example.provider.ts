// src/infrastructure/di/providers.ts

import type { Provider } from "@nestjs/common";

import { COMMON_ID_SERVICE_TOKEN } from "@/common/infrastructure/dependency-injection/common.token";
import { PRISMA_SERVICE_TOKEN } from "@/database/infrastructure/dependency-injection/database.token";
import type { IIdService } from "@/common/domain/services/id.service";
import type { PrismaService } from "@/database/infrastructure/services/prisma.service";

import { CreateExampleUseCase } from "../../application/create-example-use-cases/create-example.use-case";
import { GetExampleUseCase } from "../../application/get-example-use-cases/get-example.use-case";
import type { IExampleRepository } from "../../domain/repositories/example.repository";
import { ExamplePrismaRepository } from "../repositories/example.prisma-repository";
import { EXAMPLE_CREATE_EXAMPLE_USE_CASE_TOKEN, EXAMPLE_GET_EXAMPLE_USE_CASE_TOKEN, EXAMPLE_REPOSITORY_TOKEN } from "./example.token";

export const EXAMPLE_REPOSITORY_PROVIDER: Provider<IExampleRepository> = {
	inject: [PRISMA_SERVICE_TOKEN],
	provide: EXAMPLE_REPOSITORY_TOKEN,
	useFactory: (prismaService: PrismaService) => {
		return new ExamplePrismaRepository(prismaService);
	},
};

export const EXAMPLE_CREATE_EXAMPLE_USE_CASE_PROVIDER: Provider<CreateExampleUseCase> = {
	inject: [COMMON_ID_SERVICE_TOKEN, EXAMPLE_REPOSITORY_TOKEN],
	provide: EXAMPLE_CREATE_EXAMPLE_USE_CASE_TOKEN,
	useFactory: (idService: IIdService, exampleRepository: IExampleRepository) => {
		return new CreateExampleUseCase(idService, exampleRepository);
	},
};

export const EXAMPLE_GET_EXAMPLE_USE_CASE_PROVIDER: Provider<GetExampleUseCase> = {
	inject: [EXAMPLE_REPOSITORY_TOKEN],
	provide: EXAMPLE_GET_EXAMPLE_USE_CASE_TOKEN,
	useFactory: (exampleRepository: IExampleRepository) => {
		return new GetExampleUseCase(exampleRepository);
	},
};

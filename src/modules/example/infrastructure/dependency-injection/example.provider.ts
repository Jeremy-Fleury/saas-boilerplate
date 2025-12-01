// src/infrastructure/di/providers.ts

import type { Provider } from "@nestjs/common";

import { PRISMA_SERVICE_TOKEN } from "@/common/database/infrastructure/dependency-injection/database.token";
import { UUID_SERVICE_TOKEN } from "@/common/uuid/infrastructure/dependency-injection/uuid.token";
import type { PrismaService } from "@/common/database/infrastructure/services/prisma.service";
import type { IIdService } from "@/common/uuid/domain/services/id.service";

import { CreateExampleUseCase } from "../../application/create-example-use-cases/create-example.use-case";
import { GetExampleUseCase } from "../../application/get-example-use-cases/get-example.use-case";
import type { IExampleRepository } from "../../domain/repositories/example.repository";
import { ExamplePrismaRepository } from "../repositories/example.prisma-repository";
import { EXAMPLE_CREATE_EXAMPLE_USE_CASE_TOKEN, EXAMPLE_GET_EXAMPLE_USE_CASE_TOKEN, EXAMPLE_REPOSITORY_TOKEN } from "./example.token";

// Repository

export const EXAMPLE_REPOSITORY_PROVIDER: Provider<IExampleRepository> = {
	inject: [PRISMA_SERVICE_TOKEN],
	provide: EXAMPLE_REPOSITORY_TOKEN,
	useFactory: (prismaService: PrismaService) => {
		return new ExamplePrismaRepository(prismaService);
	},
};

// Use Cases

export const EXAMPLE_CREATE_EXAMPLE_USE_CASE_PROVIDER: Provider<CreateExampleUseCase> = {
	inject: [UUID_SERVICE_TOKEN, EXAMPLE_REPOSITORY_TOKEN],
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

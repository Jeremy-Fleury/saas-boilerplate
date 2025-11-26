import { ExamplePrismaRepository } from "@/modules/example/infrastructure/repositories/example.prisma-repository";

import type { UnitOfWorkService } from "../../domain/services/unit-of-work.service.ts";
import type { UnitOfWorkContextService } from "../../domain/services/unit-of-work-context.service.ts";
import type { Prisma } from "../prisma-client/client";
import type { PrismaService } from "./prisma.service.js";

export class UnitOfWorkPrismaService implements UnitOfWorkService {
	public constructor(private readonly _prismaService: PrismaService) {}

	public execute<TRepository>(callback: (context: UnitOfWorkContextService) => Promise<TRepository>): Promise<TRepository> {
		return this._prismaService.$transaction((transaction: Prisma.TransactionClient) => {
			const examples = new ExamplePrismaRepository(transaction);

			const context: UnitOfWorkContextService = {
				examples,
			};

			return callback(context);
		});
	}
}

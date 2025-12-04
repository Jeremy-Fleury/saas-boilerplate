import { CompanyPrismaRepository } from "@/modules/company/infrastructure/repositories/company.prisma-repository";
import { ExamplePrismaRepository } from "@/modules/example/infrastructure/repositories/example.prisma-repository";

import type { UnitOfWorkService } from "../../domain/services/unit-of-work.service";
import type { UnitOfWorkContextService } from "../../domain/services/unit-of-work-context.service";
import type { Prisma } from "../prisma-client/client";
import type { PrismaService } from "./prisma.service";

export class UnitOfWorkPrismaService implements UnitOfWorkService {
	public constructor(private readonly _prismaService: PrismaService) {}

	public execute<TResult>(callback: (context: UnitOfWorkContextService) => Promise<TResult>): Promise<TResult> {
		return this._prismaService.$transaction((tx: Prisma.TransactionClient) => {
			const example = new ExamplePrismaRepository(tx);
			const company = new CompanyPrismaRepository(tx);

			const context: UnitOfWorkContextService = {
				company,
				example,
			};

			return callback(context);
		});
	}
}

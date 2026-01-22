import { ExamplePrismaRepository } from "@/modules/example/infrastructure/repositories/example.prisma-repository";
import type { UnitOfWorkService } from "@/common/database/domain/services/unit-of-work.service";
import type { UnitOfWorkContextService } from "@/common/database/domain/services/unit-of-work-context.service";
import type { Prisma } from "@/common/database/infrastructure/prisma-client/client";

import type { PrismaService } from "./prisma.service";

export class UnitOfWorkPrismaService implements UnitOfWorkService {
	public constructor(private readonly _prismaService: PrismaService) {}

	public execute<TResult>(callback: (context: UnitOfWorkContextService) => Promise<TResult>): Promise<TResult> {
		return this._prismaService.$transaction((tx: Prisma.TransactionClient) => {
			const example = new ExamplePrismaRepository(tx);

			const context: UnitOfWorkContextService = {
				example,
			};

			return callback(context);
		});
	}
}

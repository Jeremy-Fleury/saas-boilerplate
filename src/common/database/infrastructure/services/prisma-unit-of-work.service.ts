import { ExamplePrismaRepository } from "@/modules/example/infrastructure/repositories/example.prisma-repository";

import type { IUnitOfWorkAuthContext, UnitOfWorkService } from "../../domain/services/unit-of-work.service.js";
import type { UnitOfWorkContextService } from "../../domain/services/unit-of-work-context.service.js";
import type { Prisma } from "../prisma-client/client.js";
import type { PrismaService } from "./prisma.service.js";

export class UnitOfWorkPrismaService implements UnitOfWorkService {
	public constructor(private readonly _prismaService: PrismaService) {}

	public execute<TResult>(auth: IUnitOfWorkAuthContext, callback: (context: UnitOfWorkContextService) => Promise<TResult>): Promise<TResult> {
		return this._prismaService.$transaction(async (tx: Prisma.TransactionClient) => {
			await tx.$executeRaw`SELECT set_config('app.tenant_id', ${auth.tenantId}, true)`;
			await tx.$executeRaw`SELECT set_config('app.user_id', ${auth.userId}, true)`;
			await tx.$executeRaw`SELECT set_config('app.is_platform_superadmin', ${auth.isPlatformSuperadmin ? "true" : "false"}, true)`;

			const examples = new ExamplePrismaRepository(tx);

			const context: UnitOfWorkContextService = {
				isSuperadmin: auth.isPlatformSuperadmin,
				repositories: {
					examples,
				},
				tenantId: auth.tenantId,
				userId: auth.userId,
			};

			return callback(context);
		});
	}
}

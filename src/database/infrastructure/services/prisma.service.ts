import type { OnModuleDestroy, OnModuleInit } from "@nestjs/common";

import { PrismaClient } from "@/common/database/infrastructure/prisma-client/client";

export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	public async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	public async onModuleDestroy(): Promise<void> {
		await this.$disconnect();
	}
}

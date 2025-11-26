import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PRISMA_SERVICE_PROVIDER, PRISMA_UNIT_OF_WORK_PROVIDER } from "../dependency-injection/database.provider";
import { PRISMA_SERVICE_TOKEN, PRISMA_UNIT_OF_WORK_TOKEN } from "../dependency-injection/database.token";

@Module({
	exports: [PRISMA_SERVICE_TOKEN, PRISMA_UNIT_OF_WORK_TOKEN],
	imports: [ConfigModule],
	providers: [PRISMA_SERVICE_PROVIDER, PRISMA_UNIT_OF_WORK_PROVIDER],
})
export class DatabaseModule {}

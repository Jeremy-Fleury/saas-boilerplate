import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import {
	PRISMA_SERVICE_PROVIDER,
	PRISMA_UNIT_OF_WORK_PROVIDER,
} from "@/common/database/infrastructure/dependency-injection/database.provider";
import { PRISMA_UNIT_OF_WORK_TOKEN } from "@/common/database/infrastructure/dependency-injection/database.token";

@Module({
	exports: [PRISMA_UNIT_OF_WORK_TOKEN],
	imports: [ConfigModule],
	providers: [PRISMA_SERVICE_PROVIDER, PRISMA_UNIT_OF_WORK_PROVIDER],
})
export class DatabaseModule {}

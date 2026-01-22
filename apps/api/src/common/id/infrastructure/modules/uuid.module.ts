import { Module } from "@nestjs/common";

import { UUID_SERVICE_PROVIDER } from "@/common/id/infrastructure/dependency-injection/uuid.provider";
import { UUID_SERVICE_TOKEN } from "@/common/id/infrastructure/dependency-injection/uuid.token";

@Module({
	exports: [UUID_SERVICE_TOKEN],
	providers: [UUID_SERVICE_PROVIDER],
})
export class UuidModule {}

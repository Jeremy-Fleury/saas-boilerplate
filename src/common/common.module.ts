import { Module } from "@nestjs/common";

import { COMMON_ID_SERVICE_PROVIDER } from "./infrastructure/dependency-injection/common.provider";
import { COMMON_ID_SERVICE_TOKEN } from "./infrastructure/dependency-injection/common.token";

@Module({
	exports: [COMMON_ID_SERVICE_TOKEN],
	providers: [COMMON_ID_SERVICE_PROVIDER],
})
export class CommonModule {}

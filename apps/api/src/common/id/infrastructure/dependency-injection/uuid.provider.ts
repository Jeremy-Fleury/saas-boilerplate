// src/infrastructure/di/providers.ts

import type { Provider } from "@nestjs/common";

import { UuidService } from "@/common/id/infrastructure/services/uuid.service";
import type { IdService } from "@/common/id/domain/services/id.service";

import { UUID_SERVICE_TOKEN } from "./uuid.token";

export const UUID_SERVICE_PROVIDER: Provider<IdService> = {
	provide: UUID_SERVICE_TOKEN,
	useClass: UuidService,
};

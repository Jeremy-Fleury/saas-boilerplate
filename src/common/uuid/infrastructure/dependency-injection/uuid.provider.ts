// src/infrastructure/di/providers.ts

import type { Provider } from "@nestjs/common";

import type { IIdService } from "@/common/uuid/domain/services/id.service";

import { UuidService } from "../services/uuid.service";
import { UUID_SERVICE_TOKEN } from "./uuid.token";

export const UUID_SERVICE_PROVIDER: Provider<IIdService> = {
	provide: UUID_SERVICE_TOKEN,
	useClass: UuidService,
};

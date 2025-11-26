// src/infrastructure/di/providers.ts

import type { Provider } from "@nestjs/common";

import type { IIdService } from "@/common/domain/services/id.service";

import { IdUuidService } from "../services/id.uuid-service";
import { COMMON_ID_SERVICE_TOKEN } from "./common.token";

export const COMMON_ID_SERVICE_PROVIDER: Provider<IIdService> = {
	provide: COMMON_ID_SERVICE_TOKEN,
	useClass: IdUuidService,
};

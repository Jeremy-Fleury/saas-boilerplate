import { v7 } from "uuid";

import { UuidV7 } from "@/common/id/domain/value-objects/uuid.vo";
import type { IdService } from "@/common/id/domain/services/id.service";

export class UuidService implements IdService {
	public generateUuidV7(): UuidV7 {
		return UuidV7.fromPrimitive(v7());
	}
}

import { v7 } from "uuid";

import type { IIdService } from "@/common/uuid/domain/services/id.service";

export class UuidService implements IIdService {
	public generateUuidV7(): string {
		return v7();
	}
}

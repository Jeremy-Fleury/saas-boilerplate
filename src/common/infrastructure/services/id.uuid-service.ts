import { v7 } from "uuid";

import type { IIdService } from "@/common/domain/services/id.service";

export class IdUuidService implements IIdService {
	public generateUuidV7(): string {
		return v7();
	}
}

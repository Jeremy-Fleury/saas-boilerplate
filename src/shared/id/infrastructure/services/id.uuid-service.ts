import { v7 } from "uuid";

import type { IIdService } from "../../domain/services/id.service";

export class IdUuidService implements IIdService {
	public generateUuidV7(): string {
		return v7();
	}
}

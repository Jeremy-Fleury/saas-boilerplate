import type { UuidV7 } from "@/common/id/domain/value-objects/uuid.vo";

export abstract class IdService {
	public abstract generateUuidV7(): UuidV7;
}

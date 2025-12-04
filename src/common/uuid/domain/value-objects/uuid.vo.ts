import { ValidationDomainError } from "@/common/errors/domain/domain.error";
import { RootValueObject } from "@/common/root/domain/value-objects/root.vo";

export class UuidV7 extends RootValueObject<string> {
	private constructor(value: string) {
		super(value);
	}

	public static fromPrimitive(value: string): UuidV7 {
		const regexUuidV7 = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-7[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

		if (!regexUuidV7.test(value)) {
			throw new ValidationDomainError("invalid uuid v7");
		}

		return new UuidV7(value);
	}
}

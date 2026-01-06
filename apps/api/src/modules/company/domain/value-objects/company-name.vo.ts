import { ValidationDomainError } from "@/common/errors/domain/domain.error";
import { RootValueObject } from "@/common/root/domain/value-objects/root.vo";

export class CompanyName extends RootValueObject<string> {
	private static readonly _MIN_LENGTH = 1;
	private static readonly _MAX_LENGTH = 200;

	private constructor(value: string) {
		super(value);
	}

	public static create(name: string): CompanyName {
		const value = name.trim().toLowerCase();

		if (value.length < CompanyName._MIN_LENGTH) {
			throw new ValidationDomainError("name must not be empty");
		}

		if (value.length > CompanyName._MAX_LENGTH) {
			throw new ValidationDomainError(`name must be <= ${CompanyName._MAX_LENGTH} chars`);
		}

		return new CompanyName(value);
	}
}

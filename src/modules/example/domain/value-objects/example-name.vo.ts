import { ValidationError } from "@/common/domain/errors/domain.error";
import { RootValueObject } from "@/common/domain/value-objects/root.vo";

export class ExampleNameVo extends RootValueObject<string> {
	private static readonly _EXAMPLE_NAME_MIN_LENGTH = 1;
	private static readonly _EXAMPLE_NAME_MAX_LENGTH = 100;

	private constructor(value: string) {
		super(value);
	}

	public static create(raw: string): ExampleNameVo {
		const value = raw.trim();

		if (value.length < ExampleNameVo._EXAMPLE_NAME_MIN_LENGTH) {
			throw new ValidationError("name must not be empty");
		}

		if (value.length > ExampleNameVo._EXAMPLE_NAME_MAX_LENGTH) {
			throw new ValidationError(`name must be <= ${ExampleNameVo._EXAMPLE_NAME_MAX_LENGTH} chars`);
		}

		return new ExampleNameVo(value);
	}
}

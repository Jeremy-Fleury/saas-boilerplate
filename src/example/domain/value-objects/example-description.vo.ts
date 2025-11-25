import { ValidationError } from "@/shared/errors/domain/errors/domain.error";
import { RootValueObject } from "@/shared/root/domain/value-objects/root.vo";

export class ExampleDescriptionVo extends RootValueObject<string> {
	private static readonly _EXAMPLE_DESCRIPTION_MAX_LENGTH = 1200;

	public static create(raw: string): ExampleDescriptionVo {
		const value = raw.trim();

		if (value.length > ExampleDescriptionVo._EXAMPLE_DESCRIPTION_MAX_LENGTH) {
			throw new ValidationError(`description must be <= ${ExampleDescriptionVo._EXAMPLE_DESCRIPTION_MAX_LENGTH} chars`);
		}

		return new ExampleDescriptionVo(value);
	}
}

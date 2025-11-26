import { RootValueObject } from "./root.vo";

export class UtcIsoStringVo extends RootValueObject<string> {
	private constructor(value: string) {
		super(value);
	}

	public static of(input: string): UtcIsoStringVo {
		// YYYY-MM-DDTHH:mm:ss(.fraction)?Z  (fraction 1..9 digits)
		const ok = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,9})?Z$/.test(input);

		if (!ok) {
			throw new Error(`Invalid UTC ISO string. Expected "YYYY-MM-DDTHH:mm:ss(.SSS)?Z", got: ${input}`);
		}

		return new UtcIsoStringVo(input);
	}

	public isBefore(other: UtcIsoStringVo): boolean {
		return this.value < other.value;
	}

	public isAfter(other: UtcIsoStringVo): boolean {
		return this.value > other.value;
	}
}

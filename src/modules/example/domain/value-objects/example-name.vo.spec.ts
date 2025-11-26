import { ValidationError } from "@/common/domain/errors/domain.error";

import { ExampleNameVo } from "./example-name.vo";

const EXAMPLE_NAME_MAX_LENGTH: number = 100;
const EXAMPLE_NAME_TOO_LONG_LENGTH: number = EXAMPLE_NAME_MAX_LENGTH + 1;

describe("ExampleNameVo", () => {
	it("should create a value object with a trimmed valid name", () => {
		const vo = ExampleNameVo.create("   John Doe   ");

		expect(vo.value).toBe("John Doe");
	});

	it("should allow minimum and maximum length names", () => {
		const minLengthName = "a";
		const maxLengthName = "a".repeat(EXAMPLE_NAME_MAX_LENGTH);

		const minVo = ExampleNameVo.create(minLengthName);
		const maxVo = ExampleNameVo.create(maxLengthName);

		expect(minVo.value).toBe(minLengthName);
		expect(maxVo.value).toBe(maxLengthName);
	});

	it("should throw ValidationError when name is empty or whitespace", () => {
		const invalidNames = ["", "   ", "\t", "\n"];

		for (const raw of invalidNames) {
			expect(() => ExampleNameVo.create(raw)).toThrow(ValidationError);
		}
	});

	it("should throw ValidationError when name length exceeds maximum", () => {
		const tooLongName = "a".repeat(EXAMPLE_NAME_TOO_LONG_LENGTH); // max is 100

		expect(() => ExampleNameVo.create(tooLongName)).toThrow(ValidationError);
	});
});

import { ValidationError } from "@/common/domain/errors/domain.error";

import { ExampleDescriptionVo } from "./example-description.vo";

const EXAMPLE_DESCRIPTION_MAX_LENGTH: number = 1200;
const EXAMPLE_DESCRIPTION_TOO_LONG_LENGTH: number = EXAMPLE_DESCRIPTION_MAX_LENGTH + 1;

describe("ExampleDescriptionVo", () => {
	it("should create a value object with a trimmed description", () => {
		const vo = ExampleDescriptionVo.create("   A simple description   ");

		expect(vo.value).toBe("A simple description");
	});

	it("should allow empty description", () => {
		const vo = ExampleDescriptionVo.create("   ");

		expect(vo.value).toBe("");
	});

	it("should allow maximum length description", () => {
		const maxDescription = "a".repeat(EXAMPLE_DESCRIPTION_MAX_LENGTH);

		const vo = ExampleDescriptionVo.create(maxDescription);

		expect(vo.value).toBe(maxDescription);
	});

	it("should throw ValidationError when description length exceeds maximum", () => {
		const tooLongDescription = "a".repeat(EXAMPLE_DESCRIPTION_TOO_LONG_LENGTH);

		expect(() => ExampleDescriptionVo.create(tooLongDescription)).toThrow(ValidationError);
	});
});

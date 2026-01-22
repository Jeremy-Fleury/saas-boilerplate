import { Example } from "@/modules/example/domain/entities/example.entity";
import { ExampleFixture } from "@/tests/mocks-and-fixtures/modules/example/domain/entities/example.entity.fixture";
import type { IExamplePrimitives } from "@/modules/example/domain/entities/example.entity";

describe("[src/modules/example/domain/entities/example.entity.ts]", () => {
	it("should create an example with draft status", () => {
		// Act
		const example = Example.create({
			companyId: ExampleFixture.BASE_PRIMITIVES.companyId,
			description: ExampleFixture.BASE_PRIMITIVES.description,
			id: ExampleFixture.BASE_PRIMITIVES.id,
			name: ExampleFixture.BASE_PRIMITIVES.name,
		});

		// Assert
		expect(example.id.value).toBe(ExampleFixture.BASE_PRIMITIVES.id);
		expect(example.companyId.value).toBe(ExampleFixture.BASE_PRIMITIVES.companyId);
		expect(example.name).toBe(ExampleFixture.BASE_PRIMITIVES.name);
		expect(example.description).toBe(ExampleFixture.BASE_PRIMITIVES.description);
		expect(example.status.value).toBe("draft");
	});

	it("should update name and description", () => {
		// Arrange
		const example = Example.create({
			companyId: ExampleFixture.BASE_PRIMITIVES.companyId,
			description: ExampleFixture.BASE_PRIMITIVES.description,
			id: ExampleFixture.BASE_PRIMITIVES.id,
			name: ExampleFixture.BASE_PRIMITIVES.name,
		});

		// Act
		example.updateName("Jane Doe");
		example.updateDescription("New description");

		// Assert
		expect(example.name).toBe("Jane Doe");
		expect(example.description).toBe("New description");
	});

	it("should map from primitives and back", () => {
		// Arrange
		const primitives: IExamplePrimitives = {
			...ExampleFixture.BASE_PRIMITIVES,
			status: "active",
		};

		// Act
		const example = Example.fromPrimitives(primitives);
		const result = example.toPrimitives();

		// Assert
		expect(result).toEqual(primitives);
	});
});

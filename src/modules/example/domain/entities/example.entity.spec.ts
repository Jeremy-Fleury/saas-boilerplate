import { InvalidTransitionError, ValidationError } from "@/common/domain/errors/domain.error";

import type { IExampleEntityPrimitives } from "./example.entity";
import { ExampleEntity } from "./example.entity";

const basePrimitives: IExampleEntityPrimitives = {
	description: "A description of John Doe",
	id: "example-id",
	name: "John Doe",
	status: "draft",
};

describe("ExampleEntity - creation", () => {
	it("should create an example with draft status by default", () => {
		const entity = ExampleEntity.create({
			description: basePrimitives.description,
			id: basePrimitives.id,
			name: basePrimitives.name,
		});

		expect(entity.id).toBe(basePrimitives.id);
		expect(entity.name.value).toBe(basePrimitives.name);
		expect(entity.description.value).toBe(basePrimitives.description);
		expect(entity.status).toBe("draft");
	});

	it("should trim and validate name and description on creation", () => {
		const entity = ExampleEntity.create({
			description: `   ${basePrimitives.description}   `,
			id: basePrimitives.id,
			name: `   ${basePrimitives.name}   `,
		});

		expect(entity.name.value).toBe(basePrimitives.name);
		expect(entity.description.value).toBe(basePrimitives.description);
	});

	it("should throw a ValidationError when id is empty", () => {
		expect(() =>
			ExampleEntity.create({
				description: basePrimitives.description,
				id: "   ",
				name: basePrimitives.name,
			}),
		).toThrow(ValidationError);
	});
});

describe("ExampleEntity - primitives mapping", () => {
	it("should map from primitives correctly", () => {
		const entity = ExampleEntity.fromPrimitives(basePrimitives);

		expect(entity.id).toBe(basePrimitives.id);
		expect(entity.name.value).toBe(basePrimitives.name);
		expect(entity.description.value).toBe(basePrimitives.description);
		expect(entity.status).toBe(basePrimitives.status);
	});

	it("should throw ValidationError when mapping from primitives with invalid status", () => {
		const primitives = {
			...basePrimitives,
			status: "invalid-status",
		} as unknown as IExampleEntityPrimitives;

		expect(() => ExampleEntity.fromPrimitives(primitives)).toThrow(ValidationError);
	});

	it("should convert to primitives correctly", () => {
		const entity = ExampleEntity.fromPrimitives(basePrimitives);

		const primitives = entity.toPrimitives();

		expect(primitives).toEqual(basePrimitives);
	});
});

describe("ExampleEntity - name changes", () => {
	it("should rename when new name is different", () => {
		const entity = ExampleEntity.create(basePrimitives);
		const originalName = entity.name;

		entity.rename("Jane Doe");

		expect(entity.name.value).toBe("Jane Doe");
		expect(entity.name).not.toBe(originalName);
	});

	it("should not rename when new name is the same (no-op)", () => {
		const entity = ExampleEntity.create(basePrimitives);
		const originalName = entity.name;

		entity.rename(basePrimitives.name);

		expect(entity.name.value).toBe(basePrimitives.name);
		expect(entity.name).toBe(originalName);
	});
});

describe("ExampleEntity - description changes", () => {
	it("should change description when new description is different", () => {
		const entity = ExampleEntity.create(basePrimitives);
		const originalDescription = entity.description;

		entity.changeDescription("Another description");

		expect(entity.description.value).toBe("Another description");
		expect(entity.description).not.toBe(originalDescription);
	});

	it("should not change description when new description is the same (no-op)", () => {
		const entity = ExampleEntity.create(basePrimitives);
		const originalDescription = entity.description;

		entity.changeDescription(basePrimitives.description);

		expect(entity.description.value).toBe(basePrimitives.description);
		expect(entity.description).toBe(originalDescription);
	});
});

describe("ExampleEntity - status transitions", () => {
	it("should transition from draft to active", () => {
		const entity = ExampleEntity.fromPrimitives({
			...basePrimitives,
			status: "draft",
		});

		entity.activate();

		expect(entity.status).toBe("active");
	});

	it("should transition from draft to archived", () => {
		const entity = ExampleEntity.fromPrimitives({
			...basePrimitives,
			status: "draft",
		});

		entity.archive();

		expect(entity.status).toBe("archived");
	});

	it("should transition from active to archived", () => {
		const entity = ExampleEntity.fromPrimitives({
			...basePrimitives,
			status: "active",
		});

		entity.archive();

		expect(entity.status).toBe("archived");
	});

	it("should allow staying in the same status (idempotent activate/archive)", () => {
		const active = ExampleEntity.fromPrimitives({
			...basePrimitives,
			status: "active",
		});
		const archived = ExampleEntity.fromPrimitives({
			...basePrimitives,
			status: "archived",
		});

		active.activate();
		archived.archive();

		expect(active.status).toBe("active");
		expect(archived.status).toBe("archived");
	});

	it("should throw InvalidTransitionError when transitioning from archived to active", () => {
		const entity = ExampleEntity.fromPrimitives({
			...basePrimitives,
			status: "archived",
		});

		expect(() => entity.activate()).toThrow(InvalidTransitionError);
	});
});

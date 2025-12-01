import type { IExamplePrimitives } from "./example.entity";
import { Example } from "./example.entity";

const basePrimitives: IExamplePrimitives = {
	description: "A description of John Doe",
	id: "019ae9a2-fb25-78a0-8b39-de00ab212777",
	name: "John Doe",
	status: "draft",
};

describe("ExampleEntity - creation", () => {
	it("should create an example with draft status by default", () => {
		const entity = Example.create({
			description: basePrimitives.description,
			id: basePrimitives.id,
			name: basePrimitives.name,
		});

		expect(entity.id.value).toBe(basePrimitives.id);
		expect(entity.name).toBe(basePrimitives.name);
		expect(entity.description).toBe(basePrimitives.description);
		expect(entity.status.value).toBe("draft");
	});
});

describe("ExampleEntity - primitives mapping", () => {
	it("should map from primitives correctly", () => {
		const entity = Example.fromPrimitives(basePrimitives);

		expect(entity.id.value).toBe(basePrimitives.id);
		expect(entity.name).toBe(basePrimitives.name);
		expect(entity.description).toBe(basePrimitives.description);
		expect(entity.status.value).toBe(basePrimitives.status);
	});

	it("should convert to primitives correctly", () => {
		const entity = Example.fromPrimitives(basePrimitives);

		const primitives = entity.toPrimitives();

		expect(primitives).toEqual(basePrimitives);
	});
});

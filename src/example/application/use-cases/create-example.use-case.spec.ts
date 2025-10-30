import { ExampleRepository } from "@/example/infrastructure/repositories/example.repository";
import type { ExampleInputDto } from "@/example/presentation/dto/inputs/example.input-dto";

import { CreateExampleUseCase } from "./create-example.use-case";

describe("CreateExampleUseCase", () => {
	let exampleRepository: ExampleRepository;
	let createExampleUseCase: CreateExampleUseCase;

	beforeEach(() => {
		exampleRepository = new ExampleRepository();
		createExampleUseCase = new CreateExampleUseCase(exampleRepository);
	});

	describe("execute", () => {
		it("should create an example", () => {
			const input: ExampleInputDto = {
				description: "test",
				name: "test",
			};

			const result = createExampleUseCase.execute(input);

			expect(result).toBeDefined();
			expect(result.id).toBeDefined();
			expect(result.name).toBe(input.name);
			expect(result.description).toBe(input.description);
		});
	});
});

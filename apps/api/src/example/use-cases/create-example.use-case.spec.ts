import { ExampleRepository } from "@/example/repositories/example.repository";
import { CreateExampleUseCase } from "@/example/use-cases/create-example.use-case";
import type { ExampleInputDto } from "@/example/dtos/inputs/example.input-dto";

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

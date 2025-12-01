import { Example } from "../../domain/entities/example.entity";
import type { IExampleRepository } from "../../domain/repositories/example.repository";
import { GetExampleUseCase } from "./get-example.use-case";

type TMockedExampleRepository = {
	[TKey in keyof IExampleRepository]: ReturnType<typeof vi.fn>;
};

describe("GetExampleUseCase", () => {
	let exampleRepository: TMockedExampleRepository;
	let useCase: GetExampleUseCase;

	beforeEach(() => {
		exampleRepository = {
			create: vi.fn(),
			getById: vi.fn(),
		};

		useCase = new GetExampleUseCase(exampleRepository);
	});

	it("should return the example when it exists", async () => {
		const id = "019ae9a2-fb25-78a0-8b39-de00ab212777";
		const example = Example.fromPrimitives({
			description: "A description of John Doe",
			id,
			name: "John Doe",
			status: "draft",
		});

		exampleRepository.getById.mockResolvedValueOnce(example);

		const result = await useCase.execute(id);

		expect(exampleRepository.getById).toHaveBeenCalledTimes(1);
		expect(exampleRepository.getById).toHaveBeenCalledWith(id);
		expect(result).toBe(example);
	});

	it("should return null when the example does not exist", async () => {
		const id = "non-existing-id";

		exampleRepository.getById.mockResolvedValueOnce(null);

		const result = await useCase.execute(id);

		expect(exampleRepository.getById).toHaveBeenCalledTimes(1);
		expect(exampleRepository.getById).toHaveBeenCalledWith(id);
		expect(result).toBeNull();
	});
});

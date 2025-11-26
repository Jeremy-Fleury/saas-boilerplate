import type { IIdService } from "@/common/domain/services/id.service";

import type { IExampleRepository } from "../../domain/repositories/example.repository";
import { CreateExampleUseCase } from "./create-example.use-case";

describe("CreateExampleUseCase", () => {
	let exampleRepository: IExampleRepository;
	let idService: IIdService;
	let useCase: CreateExampleUseCase;

	beforeEach(() => {
		idService = {
			generateUuidV7: vi.fn().mockReturnValueOnce("id-1").mockReturnValueOnce("id-2"),
		};

		exampleRepository = {
			create: vi.fn(),
			getById: vi.fn(),
		};

		useCase = new CreateExampleUseCase(idService, exampleRepository);
	});

	it("Should create an example", async () => {
		const example = await useCase.execute({
			description: "A description of John Doe",
			name: "John Doe",
		});

		expect(idService.generateUuidV7).toHaveBeenCalledTimes(1);
		expect(exampleRepository.create).toHaveBeenCalledTimes(1);
		expect(exampleRepository.create).toHaveBeenCalledWith(example);
	});
});

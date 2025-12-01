import type { IIdService } from "@/common/uuid/domain/services/id.service";

import type { IExampleRepository } from "../../domain/repositories/example.repository";
import { CreateExampleUseCase } from "./create-example.use-case";

describe("CreateExampleUseCase", () => {
	let exampleRepository: IExampleRepository;
	let idService: IIdService;
	let useCase: CreateExampleUseCase;

	beforeEach(() => {
		idService = {
			generateUuidV7: vi.fn().mockReturnValueOnce("019ae9a2-fb25-7300-afc4-9c966cb1df53").mockReturnValueOnce("019ae9a2-fb25-7a07-992c-1dc785d90476"),
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

import { vi } from "vitest";

import { CreateExampleUseCase } from "@/modules/example/application/create-example.use-case";
import { buildUnitOfWorkMock } from "@/tests/mocks-and-fixtures/common/database/services/unit-of-work.service.mock";
import { buildIdServiceMock } from "@/tests/mocks-and-fixtures/common/id/services/id-service.mock";
import { ExampleFixture } from "@/tests/mocks-and-fixtures/modules/example/domain/entities/example.entity.fixture";

describe("[src/modules/example/application/create-example.use-case.ts]", () => {
	let useCase: CreateExampleUseCase;
	const { unitOfWorkMock, contextMock } = buildUnitOfWorkMock();
	const idServiceMock = buildIdServiceMock();

	beforeAll(() => {
		useCase = new CreateExampleUseCase(idServiceMock, unitOfWorkMock);
	});

	afterAll(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it("should create an example", async () => {
		// Arrange
		vi.mocked(idServiceMock.generateUuidV7).mockReturnValue(ExampleFixture.BASE_ENTITY.id);
		vi.mocked(contextMock.example.create).mockResolvedValue(undefined);

		// Act
		const result = await useCase.execute({
			companyId: ExampleFixture.BASE_PRIMITIVES.companyId,
			description: ExampleFixture.BASE_PRIMITIVES.description,
			name: ExampleFixture.BASE_PRIMITIVES.name,
		});

		// Assert
		expect(result).toEqual(ExampleFixture.BASE_ENTITY);
		expect(idServiceMock.generateUuidV7).toHaveBeenCalledTimes(1);
		expect(contextMock.example.create).toHaveBeenCalledTimes(1);
		expect(contextMock.example.create).toHaveBeenCalledWith(ExampleFixture.BASE_ENTITY);
	});
});

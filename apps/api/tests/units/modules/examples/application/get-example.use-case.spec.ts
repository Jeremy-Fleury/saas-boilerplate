import { vi } from "vitest";

import { GetExampleUseCase } from "@/modules/example/application/get-example.use-case";
import { buildUnitOfWorkMock } from "@/tests/mocks-and-fixtures/common/database/services/unit-of-work.service.mock";
import { ExampleFixture } from "@/tests/mocks-and-fixtures/modules/example/domain/entities/example.entity.fixture";

describe("[src/modules/example/application/get-example.use-case.ts]", () => {
	let useCase: GetExampleUseCase;
	const { unitOfWorkMock, contextMock } = buildUnitOfWorkMock();

	beforeAll(() => {
		useCase = new GetExampleUseCase(unitOfWorkMock);
	});

	afterAll(() => {
		vi.restoreAllMocks();
	});

	afterEach(() => {
		vi.resetAllMocks();
	});

	it("should get an example", async () => {
		// Arrange
		vi.mocked(contextMock.example.getById).mockResolvedValue(ExampleFixture.BASE_ENTITY);

		// Act
		const result = await useCase.execute(ExampleFixture.BASE_ENTITY.id.value);

		// Assert
		expect(result).toEqual(ExampleFixture.BASE_ENTITY);
	});
});

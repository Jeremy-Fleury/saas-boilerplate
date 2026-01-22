import { vi } from "vitest";
import type { MockedObject } from "vitest";

import { buildExampleRepositoryMock } from "@/tests/mocks-and-fixtures/modules/example/domain/repositories/example.repository.mock";
import type { UnitOfWorkService } from "@/common/database/domain/services/unit-of-work.service";
import type { IExampleRepository } from "@/modules/example/domain/repositories/example.repository";

export function buildUnitOfWorkMock(): {
	contextMock: {
		example: MockedObject<IExampleRepository>;
	};
	unitOfWorkMock: UnitOfWorkService;
} {
	const contextMock = {
		example: buildExampleRepositoryMock(),
	};

	const unitOfWorkMock: UnitOfWorkService = {
		execute: vi.fn(async (cb) => cb(contextMock)),
	};

	return { contextMock, unitOfWorkMock };
}

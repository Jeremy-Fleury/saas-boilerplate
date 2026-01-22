import { vi } from "vitest";
import type { MockedObject } from "vitest";

import type { IExampleRepository } from "@/modules/example/domain/repositories/example.repository";

export function buildExampleRepositoryMock(): MockedObject<IExampleRepository> {
	return vi.mockObject<IExampleRepository>({
		create: vi.fn(),
		getById: vi.fn(),
	});
}

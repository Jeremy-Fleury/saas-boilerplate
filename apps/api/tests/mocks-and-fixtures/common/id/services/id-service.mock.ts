import { vi } from "vitest";
import type { MockedObject } from "vitest";

import type { IdService } from "@/common/id/domain/services/id.service";

export function buildIdServiceMock(): MockedObject<IdService> {
	return vi.mockObject<IdService>({
		generateUuidV7: vi.fn(),
	});
}

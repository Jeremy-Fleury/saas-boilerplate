import { DateTime } from "luxon";

import type { IDateService } from "@/common/domain/services/date.service";

export class DateLuxonService implements IDateService {
	public nowUtcIso(): string {
		return DateTime.now().toUTC().toISO();
	}
}

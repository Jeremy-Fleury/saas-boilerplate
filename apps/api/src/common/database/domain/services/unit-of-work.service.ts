import type { UnitOfWorkContextService } from "./unit-of-work-context.service";

export abstract class UnitOfWorkService {
	public abstract execute<TResult>(
		callback: (context: UnitOfWorkContextService) => Promise<TResult>,
	): Promise<TResult>;
}

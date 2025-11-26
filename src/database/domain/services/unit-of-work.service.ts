import type { UnitOfWorkContextService } from "./unit-of-work-context.service";

export abstract class UnitOfWorkService {
	public abstract execute<TRepository>(callback: (context: UnitOfWorkContextService) => Promise<TRepository>): Promise<TRepository>;
}

import type { UnitOfWorkContextService } from "./unit-of-work-context.service";

export interface IUnitOfWorkAuthContext {
	tenantId: string;
	userId: string;
	isPlatformSuperadmin: boolean;
}

export abstract class UnitOfWorkService {
	public abstract execute<TRepository>(
		auth: IUnitOfWorkAuthContext,
		callback: (context: UnitOfWorkContextService) => Promise<TRepository>,
	): Promise<TRepository>;
}

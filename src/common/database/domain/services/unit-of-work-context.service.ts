import type { IExampleRepository } from "@/modules/example/domain/repositories/example.repository";

export abstract class UnitOfWorkContextService {
	public abstract tenantId: string;
	public abstract userId: string;
	public abstract isSuperadmin: boolean;
	public abstract repositories: {
		examples: IExampleRepository;
	};
}

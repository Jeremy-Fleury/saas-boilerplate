import type { IExampleRepository } from "@/modules/example/domain/repositories/example.repository";

export abstract class UnitOfWorkContextService {
	public abstract example: IExampleRepository;
}

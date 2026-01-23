import { RessourceNotFoundApplicationError } from "@/common/errors/domain/application.error";
import type { UnitOfWorkService } from "@/common/database/domain/services/unit-of-work.service";
import type { Example } from "@/modules/example/domain/entities/example.entity";

export interface ICreateExampleUseCaseProps {
	name: string;
	description: string;
}

export class GetExampleUseCase {
	public constructor(private readonly _unitOfWork: UnitOfWorkService) {}

	public async execute(id: string): Promise<Example> {
		return await this._unitOfWork.execute(async (context): Promise<Example> => {
			const example = await context.example.getById(id);

			if (!example) {
				throw new RessourceNotFoundApplicationError(`Example ${id} not found`);
			}

			return example;
		});
	}
}

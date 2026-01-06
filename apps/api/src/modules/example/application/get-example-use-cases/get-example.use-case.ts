import type { UnitOfWorkService } from "@/common/database/domain/services/unit-of-work.service";

import type { Example } from "../../domain/entities/example.entity";

export interface ICreateExampleUseCaseProps {
	name: string;
	description: string;
}

export class GetExampleUseCase {
	public constructor(private readonly _unitOfWork: UnitOfWorkService) {}

	public async execute(id: string): Promise<Example | null> {
		return await this._unitOfWork.execute(async (context): Promise<Example | null> => {
			return await context.example.getById(id);
		});
	}
}

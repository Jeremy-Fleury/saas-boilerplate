import type { UnitOfWorkService } from "@/common/database/domain/services/unit-of-work.service";
import type { IIdService } from "@/common/uuid/domain/services/id.service";

import { Example } from "../../domain/entities/example.entity";

export interface ICreateExampleUseCaseProps {
	name: string;
	description: string;
	companyId: string;
}

export class CreateExampleUseCase {
	public constructor(
		private readonly _idService: IIdService,
		private readonly _unitOfWork: UnitOfWorkService,
	) {}

	public async execute(props: ICreateExampleUseCaseProps): Promise<Example> {
		return await this._unitOfWork.execute(async (context): Promise<Example> => {
			const id = this._idService.generateUuidV7();

			const example = Example.create({
				companyId: props.companyId,
				description: props.description,
				id,
				name: props.name,
			});

			await context.example.create(example);

			return example;
		});
	}
}

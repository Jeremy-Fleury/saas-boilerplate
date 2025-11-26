import type { IIdService } from "@/common/domain/services/id.service";

import { ExampleEntity } from "../../domain/entities/example.entity";
import type { IExampleRepository } from "../../domain/repositories/example.repository";

export interface ICreateExampleUseCaseProps {
	name: string;
	description: string;
}

export class CreateExampleUseCase {
	public constructor(
		private readonly _idService: IIdService,
		private readonly _exampleRepository: IExampleRepository,
	) {}

	public async execute(props: ICreateExampleUseCaseProps): Promise<ExampleEntity> {
		const id = this._idService.generateUuidV7();

		const example = ExampleEntity.create({
			description: props.description,
			id,
			name: props.name,
		});

		await this._exampleRepository.create(example);

		return example;
	}
}

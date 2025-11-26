import type { IDateService } from "@/common/domain/services/date.service";
import type { IIdService } from "@/common/domain/services/id.service";

import { ExampleEntity } from "../../domain/entities/example.entity";

export interface ICreateExampleUseCaseProps {
	name: string;
	description: string;
}

export class CreateExampleUseCase {
	public constructor(
		private readonly _dateService: IDateService,
		private readonly _idService: IIdService,
	) {}

	public execute(props: ICreateExampleUseCaseProps): ExampleEntity {
		const id = this._idService.generateUuidV7();
		const now = this._dateService.nowUtcIso();

		const example = ExampleEntity.create({
			description: props.description,
			id,
			name: props.name,
			now,
		});

		return example;
	}
}

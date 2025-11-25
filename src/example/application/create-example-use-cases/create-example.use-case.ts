import { ExampleEntity } from "@/example/domain/entities/example.entity";
import type { IDateService } from "@/shared/clock/domain/services/date.service";
import type { IIdService } from "@/shared/id/domain/services/id.service";

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

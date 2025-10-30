import { Inject } from "@nestjs/common";

import { randomUUID } from "node:crypto";

import { ExampleRepository } from "@/example/infrastructure/repositories/example.repository";
import type { IExampleAggregate } from "@/example/domain/aggregates/example.aggregate";
import type { ExampleInputDto } from "@/example/presentation/dto/inputs/example.input-dto";

export class CreateExampleUseCase {
	public constructor(
		@Inject(ExampleRepository)
		private readonly _exampleRepository: ExampleRepository,
	) {}

	public execute(input: ExampleInputDto): IExampleAggregate {
		const example: IExampleAggregate = {
			description: input.description,
			id: randomUUID(),
			name: input.name,
		};

		return this._exampleRepository.create(example);
	}
}

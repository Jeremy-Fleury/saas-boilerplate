import { Inject } from "@nestjs/common";

import { randomUUID } from "node:crypto";

import { ExampleRepository } from "@/example/repositories/example.repository";
import type { ExampleInputDto } from "@/example/dtos/inputs/example.input-dto";
import type { IExampleEntity } from "@/example/entities/example.entity";

export class CreateExampleUseCase {
	public constructor(
		@Inject(ExampleRepository)
		private readonly _exampleRepository: ExampleRepository,
	) {}

	public execute(input: ExampleInputDto): IExampleEntity {
		const example: IExampleEntity = {
			description: input.description,
			id: randomUUID(),
			name: input.name,
		};

		return this._exampleRepository.create(example);
	}
}

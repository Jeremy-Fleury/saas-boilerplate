import { HttpException, HttpStatus, Inject } from "@nestjs/common";

import { ExampleRepository } from "@/example/infrastructure/repositories/example.repository";
import type { IExampleAggregate } from "@/example/domain/aggregates/example.aggregate";

export class GetExampleUseCase {
	public constructor(
		@Inject(ExampleRepository)
		private readonly _exampleRepository: ExampleRepository,
	) {}

	public execute(id: string): IExampleAggregate | null {
		const example = this._exampleRepository.getById(id);

		if (!example) {
			throw new HttpException("Example not found", HttpStatus.NOT_FOUND);
		}

		return example;
	}
}

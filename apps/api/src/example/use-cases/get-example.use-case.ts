import { HttpException, HttpStatus, Inject } from "@nestjs/common";

import { ExampleRepository } from "@/example/repositories/example.repository";
import type { IExampleEntity } from "@/example/entities/example.entity";

export class GetExampleUseCase {
	public constructor(
		@Inject(ExampleRepository)
		private readonly _exampleRepository: ExampleRepository,
	) {}

	public execute(id: string): IExampleEntity | null {
		const example = this._exampleRepository.getById(id);

		if (!example) {
			throw new HttpException("Example not found", HttpStatus.NOT_FOUND);
		}

		return example;
	}
}

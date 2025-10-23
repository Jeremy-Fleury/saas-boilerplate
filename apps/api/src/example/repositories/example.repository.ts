import { HttpException, HttpStatus } from "@nestjs/common";

import type { IExampleEntity } from "@/example/entities/example.entity";

export class ExampleRepository {
	private readonly _examples: Map<string, IExampleEntity> = new Map();

	public getById(id: string): IExampleEntity | null {
		return this._examples.get(id) ?? null;
	}

	public create(input: IExampleEntity): IExampleEntity {
		if (this._examples.has(input.id)) {
			throw new HttpException("Example already exists", HttpStatus.CONFLICT);
		}

		this._examples.set(input.id, input);

		const example = this._examples.get(input.id);

		if (!example) {
			throw new HttpException("Error creating example", HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return example;
	}
}

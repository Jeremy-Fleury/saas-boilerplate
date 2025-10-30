import { HttpException, HttpStatus } from "@nestjs/common";

import type { IExampleAggregate } from "@/example/domain/aggregates/example.aggregate";
import type { IExampleRepository } from "@/example/domain/repositories/example.repository";

export class ExampleRepository implements IExampleRepository {
	private readonly _examples: Map<string, IExampleAggregate> = new Map();

	public getById(id: string): IExampleAggregate | null {
		return this._examples.get(id) ?? null;
	}

	public create(input: IExampleAggregate): IExampleAggregate {
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

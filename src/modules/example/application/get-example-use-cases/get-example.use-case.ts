import type { ExampleEntity } from "../../domain/entities/example.entity";
import type { IExampleRepository } from "../../domain/repositories/example.repository";

export interface ICreateExampleUseCaseProps {
	name: string;
	description: string;
}

export class GetExampleUseCase {
	public constructor(private readonly _exampleRepository: IExampleRepository) {}

	public async execute(id: string): Promise<ExampleEntity | null> {
		const example = await this._exampleRepository.getById(id);

		return example;
	}
}

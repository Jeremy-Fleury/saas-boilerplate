import type { ExampleEntity } from "../entities/example.entity";

export interface IExampleRepository {
	getById(id: string): ExampleEntity | null;
	create(input: ExampleEntity): void;
}

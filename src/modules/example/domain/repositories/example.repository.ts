import type { ExampleEntity } from "../entities/example.entity";

export interface IExampleRepository {
	getById(id: string): Promise<ExampleEntity | null>;
	create(input: ExampleEntity): Promise<void>;
}

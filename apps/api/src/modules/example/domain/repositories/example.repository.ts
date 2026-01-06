import type { Example } from "../entities/example.entity";

export interface IExampleRepository {
	getById(id: string): Promise<Example | null>;
	create(input: Example): Promise<void>;
}

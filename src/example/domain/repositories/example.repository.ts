import type { IExampleAggregate } from "../aggregates/example.aggregate";

export interface IExampleRepository {
	getById(id: string): IExampleAggregate | null;
	create(input: IExampleAggregate): IExampleAggregate;
}

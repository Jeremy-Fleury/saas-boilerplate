import type { IDomainEvent } from "@/shared/domain/events/domain.event";

export interface IExampleCreatedDomainEvent extends IDomainEvent {
	readonly type: "ExampleCreated";
	readonly payload: {
		readonly description: string;
		readonly name: string;
	};
}

import type { IDomainEvent } from "@/shared/domain/events/domain.event";

export interface IExampleNameChangedDomainEvent extends IDomainEvent {
	readonly type: "ExampleNameChanged";
	readonly payload: {
		readonly name: string;
	};
}

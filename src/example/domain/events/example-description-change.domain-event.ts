import type { IDomainEvent } from "@/shared/domain/events/domain.event";

export interface IExampleDescriptionChangedDomainEvent extends IDomainEvent {
	readonly type: "ExampleDescriptionChanged";
	readonly payload: {
		readonly description: string;
	};
}

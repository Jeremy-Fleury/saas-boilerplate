import { randomUUID } from "node:crypto";

import type { IExampleCreatedDomainEvent } from "../events/example.create.domain-event";
import type { IExampleDescriptionChangedDomainEvent } from "../events/example-description-change.domain-event";
import type { IExampleNameChangedDomainEvent } from "../events/example-name-change.domain-event";

export interface IExampleAggregate {
	id: string;
	name: string;
	description: string;
}

export type TExampleDomainEvents =
	| IExampleCreatedDomainEvent
	| IExampleNameChangedDomainEvent
	| IExampleDescriptionChangedDomainEvent;

export class ExampleAggregate implements IExampleAggregate {
	private readonly _id: string;
	private readonly _uncommittedEvents: TExampleDomainEvents[] = [];
	private _name: string;
	private _description: string;

	private constructor(id: string) {
		this._id = id;
		this._name = "";
		this._description = "";
	}

	// --- Getters ---

	public get id(): string {
		return this._id;
	}

	public get name(): string {
		return this._name;
	}

	public get description(): string {
		return this._description;
	}

	public get uncommittedEvents(): TExampleDomainEvents[] {
		return [...this._uncommittedEvents];
	}

	// --- Static Factory Methods ---

	public static create(name: string, description: string): ExampleAggregate {
		const aggregate = new ExampleAggregate(randomUUID());
		aggregate._record({
			aggregateId: aggregate._id,
			occurredAt: new Date(),
			payload: { description, name },
			type: "ExampleCreated",
		});
		return aggregate;
	}

	public static rehydrate(events: TExampleDomainEvents[]): ExampleAggregate {
		if (events.length === 0) {
			throw new Error("Cannot rehydrate entity without events");
		}

		const aggregate = new ExampleAggregate(events[0].aggregateId);

		for (const event of events) {
			aggregate._apply(event);
		}

		return aggregate;
	}

	// --- Commands (public) ---

	public changeName(name: string): void {
		const trimmed = name.trim();

		const MIN_NAME_LENGTH = 3;
		const MAX_NAME_LENGTH = 100;

		if (trimmed.length < MIN_NAME_LENGTH) {
			throw new Error("Name must be at least 3 characters long");
		}
		if (trimmed.length > MAX_NAME_LENGTH) {
			throw new Error("Name must be less than 100 characters long");
		}

		this._record({
			aggregateId: this._id,
			occurredAt: new Date(),
			payload: { name: trimmed },
			type: "ExampleNameChanged",
		});
	}

	public changeDescription(description: string): void {
		const trimmed = description.trim();

		if (trimmed.length < 10) {
			throw new Error("Description must be at least 10 characters long");
		}

		this._record({
			aggregateId: this._id,
			occurredAt: new Date(),
			payload: { description: trimmed },
			type: "ExampleDescriptionChanged",
		});
	}

	// --- Core Event Sourcing Methods ---

	private _record(event: TExampleDomainEvents): void {
		this._apply(event);
		this._uncommittedEvents.push(event);
	}

	private _apply(event: TExampleDomainEvents): void {
		switch (event.type) {
			case "ExampleCreated": {
				this._name = event.payload.name;
				this._description = event.payload.description;
				break;
			}
			case "ExampleNameChanged": {
				this._name = event.payload.name;
				break;
			}
			case "ExampleDescriptionChanged": {
				this._description = event.payload.description;
				break;
			}
		}
	}
}

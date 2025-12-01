import { Root } from "@/common/root/domain/entities/root.entity";
import { UuidV7 } from "@/common/uuid/domain/value-objects/uuid.vo";
import type { IRootConstructorProps, IRootPrimitives } from "@/common/root/domain/entities/root.entity";

import { ExampleStatus } from "../value-objects/example-status.vo";

interface IExampleConstructorProps extends IRootConstructorProps {
	name: string;
	description: string;
	status: ExampleStatus;
}

interface IExampleCreateProps {
	id: string;
	name: string;
	description: string;
}

export interface IExamplePrimitives extends IRootPrimitives {
	name: string;
	description: string;
	status: string;
}

export class Example extends Root {
	private _name: string;
	private _description: string;
	private _status: ExampleStatus;

	private constructor(props: IExampleConstructorProps) {
		super(props);
		this._name = props.name;
		this._description = props.description;
		this._status = props.status;
	}

	// Getters

	public get name(): string {
		return this._name;
	}

	public get description(): string {
		return this._description;
	}

	public get status(): ExampleStatus {
		return this._status;
	}

	// Business logic

	public static create(props: IExampleCreateProps): Example {
		return new Example({
			description: props.description,
			id: UuidV7.fromPrimitive(props.id),
			name: props.name,
			status: ExampleStatus.draft(),
		});
	}

	public updateDescription(description: string): void {
		this._description = description;
	}

	public updateName(name: string): void {
		this._name = name;
	}

	// Mapping

	public static fromPrimitives(props: IExamplePrimitives): Example {
		return new Example({
			description: props.description,
			id: UuidV7.fromPrimitive(props.id),
			name: props.name,
			status: ExampleStatus.fromPrimitive(props.status),
		});
	}

	public toPrimitives(): IExamplePrimitives {
		return {
			description: this.description,
			id: this.id.value,
			name: this.name,
			status: this.status.value,
		};
	}
}

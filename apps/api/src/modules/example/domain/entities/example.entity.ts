import { UuidV7 } from "@/common/id/domain/value-objects/uuid.vo";
import { Root } from "@/common/root/domain/entities/root.entity";
import { ExampleStatus } from "@/modules/example/domain/value-objects/example-status.vo";
import type { IRootConstructorProps, IRootPrimitives } from "@/common/root/domain/entities/root.entity";

interface IExampleConstructorProps extends IRootConstructorProps {
	companyId: string;
	description: string;
	name: string;
	status: ExampleStatus;
}

interface IExampleCreateProps {
	companyId: string;
	description: string;
	id: string;
	name: string;
}

export interface IExamplePrimitives extends IRootPrimitives {
	companyId: string;
	description: string;
	name: string;
	status: string;
}

export class Example extends Root {
	private _companyId: UuidV7;
	private _description: string;
	private _name: string;
	private _status: ExampleStatus;

	private constructor(props: IExampleConstructorProps) {
		super(props);
		this._companyId = UuidV7.fromPrimitive(props.companyId);
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

	public get companyId(): UuidV7 {
		return this._companyId;
	}

	// Business logic

	public static create(props: IExampleCreateProps): Example {
		return new Example({
			companyId: props.companyId,
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
			companyId: props.companyId,
			description: props.description,
			id: UuidV7.fromPrimitive(props.id),
			name: props.name,
			status: ExampleStatus.fromPrimitive(props.status),
		});
	}

	public toPrimitives(): IExamplePrimitives {
		return {
			companyId: this.companyId.value,
			description: this.description,
			id: this.id.value,
			name: this.name,
			status: this.status.value,
		};
	}
}

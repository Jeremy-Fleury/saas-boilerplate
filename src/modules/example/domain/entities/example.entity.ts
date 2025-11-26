import { RootEntity } from "@/common/domain/entities/root.entity";
import type { IRootEntityPrimitives, IRootEntityProps } from "@/common/domain/entities/root.entity";

import { assertCanTransitionExampleStatus, assertExampleStatus } from "../rules/example-status.rules";
import type { TExampleStatus } from "../types/example-status.type";
import { ExampleDescriptionVo } from "../value-objects/example-description.vo";
import { ExampleNameVo } from "../value-objects/example-name.vo";

export interface IExampleEntityPrimitives extends IRootEntityPrimitives {
	name: string;
	description: string;
	status: TExampleStatus;
}

interface IExampleEntityProps extends IRootEntityProps {
	name: ExampleNameVo;
	description: ExampleDescriptionVo;
	status: TExampleStatus;
}

export class ExampleEntity extends RootEntity {
	private _name: ExampleNameVo;
	private _description: ExampleDescriptionVo;
	private _status: TExampleStatus;

	private constructor(props: IExampleEntityProps) {
		super(props);
		this._name = props.name;
		this._description = props.description;
		this._status = props.status;
	}

	public get name(): ExampleNameVo {
		return this._name;
	}

	public get description(): ExampleDescriptionVo {
		return this._description;
	}

	public get status(): TExampleStatus {
		return this._status;
	}

	public static create(props: { id: string; name: string; description: string }): ExampleEntity {
		return new ExampleEntity({
			description: ExampleDescriptionVo.create(props.description),
			id: props.id,
			name: ExampleNameVo.create(props.name),
			status: "draft",
		});
	}

	public static fromPrimitives(p: IExampleEntityPrimitives): ExampleEntity {
		assertExampleStatus(p.status);

		return new ExampleEntity({
			description: ExampleDescriptionVo.create(p.description),
			id: p.id,
			name: ExampleNameVo.create(p.name),
			status: p.status,
		});
	}

	public toPrimitives(): IExampleEntityPrimitives {
		return {
			description: this.description.value,
			id: this.id,
			name: this.name.value,
			status: this.status,
		};
	}

	public rename(rawName: string): void {
		const next = ExampleNameVo.create(rawName);

		if (next.value === this._name.value) {
			return;
		}

		this._name = next;
	}

	public changeDescription(rawDescription: string): void {
		const next = ExampleDescriptionVo.create(rawDescription);
		if (next.value === this._description.value) {
			return;
		}
		this._description = next;
	}

	public activate(): void {
		this._transitionTo("active");
	}

	public archive(): void {
		this._transitionTo("archived");
	}

	private _transitionTo(next: TExampleStatus): void {
		assertCanTransitionExampleStatus(this._status, next);

		if (this._status === next) {
			return;
		}

		this._status = next;
	}
}

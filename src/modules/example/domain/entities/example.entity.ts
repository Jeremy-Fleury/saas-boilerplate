import { assertCanTransitionExampleStatus, assertExampleStatus } from "@/example/domain/rules/example-status.rules";
import { ExampleDescriptionVo } from "@/example/domain/value-objects/example-description.vo";
import { ExampleNameVo } from "@/example/domain/value-objects/example-name.vo";
import { RootEntity } from "@/shared/root/domain/entities/root.entity";
import type { TExampleStatus } from "@/example/domain/types/example-status.type";
import type { UtcIsoStringVo } from "@/shared/date/domain/value-objects/utc-iso-string.vo";
import type { IRootEntityPrimitives, IRootEntityProps } from "@/shared/root/domain/entities/root.entity";

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

	public static create(props: { id: string; now: string; name: string; description: string }): ExampleEntity {
		return new ExampleEntity({
			createdAt: props.now,
			description: ExampleDescriptionVo.create(props.description),
			id: props.id,
			name: ExampleNameVo.create(props.name),
			status: "draft",
			updatedAt: props.now,
		});
	}

	public static fromPrimitives(p: IExampleEntityPrimitives): ExampleEntity {
		assertExampleStatus(p.status);

		return new ExampleEntity({
			createdAt: p.createdAt,
			description: ExampleDescriptionVo.create(p.description),
			id: p.id,
			name: ExampleNameVo.create(p.name),
			status: p.status,
			updatedAt: p.updatedAt,
		});
	}

	public toPrimitives(): IExampleEntityPrimitives {
		return {
			createdAt: this.createdAt.value,
			description: this.description.value,
			id: this.id,
			name: this.name.value,
			status: this.status,
			updatedAt: this.updatedAt.value,
		};
	}

	public rename(rawName: string, now: UtcIsoStringVo): void {
		const next = ExampleNameVo.create(rawName);

		if (next.value === this._name.value) {
			return;
		}

		this._name = next;
		this.updatedAt = now;
	}

	public changeDescription(rawDescription: string, now: UtcIsoStringVo): void {
		const next = ExampleDescriptionVo.create(rawDescription);
		if (next.value === this._description.value) {
			return;
		}
		this._description = next;
		this.updatedAt = now;
	}

	public activate(now: UtcIsoStringVo): void {
		this._transitionTo("active", now);
	}

	public archive(now: UtcIsoStringVo): void {
		this._transitionTo("archived", now);
	}

	private _transitionTo(next: TExampleStatus, now: UtcIsoStringVo): void {
		assertCanTransitionExampleStatus(this._status, next);

		if (this._status === next) {
			return;
		}

		this._status = next;
		this.updatedAt = now;
	}
}

import { UtcIsoStringVo } from "@/shared/clock/domain/value-objects/utc-iso-string.vo";
import { ValidationError } from "@/shared/errors/domain/errors/domain.error";

export interface IRootEntityPrimitives {
	id: string;
	createdAt: string;
	updatedAt: string;
}

export interface IRootEntityProps {
	readonly id: string;
	readonly createdAt: string;
	readonly updatedAt: string;
}

export abstract class RootEntity {
	protected readonly _id: string;
	protected readonly _createdAt: UtcIsoStringVo;
	protected _updatedAt: UtcIsoStringVo;

	protected constructor(props: IRootEntityProps) {
		if (!props.id.trim()) {
			throw new ValidationError("id is required");
		}

		this._id = props.id;
		this._createdAt = UtcIsoStringVo.of(props.createdAt);
		this._updatedAt = UtcIsoStringVo.of(props.updatedAt);

		if (this._createdAt.isAfter(this._updatedAt)) {
			throw new ValidationError(
				`createdAt must be before or equal to updatedAt. createdAt: ${this._createdAt.value}, updatedAt: ${this._updatedAt.value}`,
			);
		}
	}

	public get id(): string {
		return this._id;
	}

	public get createdAt(): UtcIsoStringVo {
		return this._createdAt;
	}

	public get updatedAt(): UtcIsoStringVo {
		return this._updatedAt;
	}

	public set updatedAt(now: UtcIsoStringVo) {
		this._updatedAt = now;
	}
}

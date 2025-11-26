import { ValidationError } from "../errors/domain.error";

export interface IRootEntityPrimitives {
	id: string;
}

export interface IRootEntityProps {
	readonly id: string;
}

export abstract class RootEntity {
	protected readonly _id: string;

	protected constructor(props: IRootEntityProps) {
		if (!props.id.trim()) {
			throw new ValidationError("id is required");
		}

		this._id = props.id;
	}

	public get id(): string {
		return this._id;
	}
}

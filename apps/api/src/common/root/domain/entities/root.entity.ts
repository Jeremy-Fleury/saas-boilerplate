import type { UuidV7 } from "@/common/id/domain/value-objects/uuid.vo";

export interface IRootPrimitives {
	id: string;
}

export interface IRootConstructorProps {
	readonly id: UuidV7;
}

export abstract class Root {
	protected readonly _id: UuidV7;

	protected constructor(props: IRootConstructorProps) {
		this._id = props.id;
	}

	public get id(): UuidV7 {
		return this._id;
	}
}

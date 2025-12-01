import { Root } from "@/common/root/domain/entities/root.entity";
import { UuidV7 } from "@/common/uuid/domain/value-objects/uuid.vo";
import type { IRootConstructorProps, IRootPrimitives } from "@/common/root/domain/entities/root.entity";

import { CompanyName } from "../value-objects/company-name.vo";

export interface ICompanyPrimitives extends IRootPrimitives {
	name: string;
}

interface ICompanyConstructorProps extends IRootConstructorProps {
	name: CompanyName;
}

interface ICompanyCreateProps {
	id: string;
	name: string;
}

export class Company extends Root {
	private _name: CompanyName;

	private constructor(props: ICompanyConstructorProps) {
		super(props);
		this._name = props.name;
	}

	public get name(): CompanyName {
		return this._name;
	}

	public static create(props: ICompanyCreateProps): Company {
		return new Company({
			id: UuidV7.fromPrimitive(props.id),
			name: CompanyName.create(props.name),
		});
	}

	public static fromPrimitives(p: ICompanyPrimitives): Company {
		return new Company({
			id: UuidV7.fromPrimitive(p.id),
			name: CompanyName.create(p.name),
		});
	}

	public toPrimitives(): ICompanyPrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
		};
	}
}

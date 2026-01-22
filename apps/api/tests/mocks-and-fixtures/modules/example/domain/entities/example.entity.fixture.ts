import { Example } from "@/modules/example/domain/entities/example.entity";
import type { IExamplePrimitives } from "@/modules/example/domain/entities/example.entity";

export class ExampleFixture {
	public static readonly BASE_PRIMITIVES: IExamplePrimitives = {
		companyId: "019be5e6-c357-733b-8857-25fef291279f",
		description: "A description of John Doe",
		id: "019be5e6-c357-7661-82bb-4d4b23df82e5",
		name: "John Doe",
		status: "draft",
	};

	public static readonly BASE_ENTITY: Example = Example.create(this.BASE_PRIMITIVES);
}

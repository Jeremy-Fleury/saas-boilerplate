import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

interface IExampleInputDtoProps {
	name: string;
	description: string;
	companyId: string;
	tenantId: string;
}

export class ExampleInputDto implements IExampleInputDtoProps {
	public constructor(props: IExampleInputDtoProps) {
		this.name = props.name;
		this.description = props.description;
		this.companyId = props.companyId;
		this.tenantId = props.tenantId;
	}

	@ApiProperty({
		description: "The name of the example",
		example: "Example",
		required: true,
		type: String,
	})
	@IsString()
	public name: string;

	@ApiProperty({
		description: "The description of the example",
		example: "Description",
		required: true,
		type: String,
	})
	@IsString()
	public description: string;

	@ApiProperty({
		description: "The company identifier",
		example: "019ae9a2-fb25-78a0-8b39-de00ab262777",
		required: true,
		type: String,
	})
	@IsString()
	public companyId: string;

	@ApiProperty({
		description: "The tenant identifier",
		example: "019ae9a2-fb25-78a0-8b39-de00ab212747",
		required: true,
		type: String,
	})
	@IsString()
	public tenantId: string;
}

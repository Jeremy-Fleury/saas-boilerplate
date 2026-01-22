import { ApiProperty } from "@nestjs/swagger";

interface IExampleOutputDtoProps {
	id: string;
	name: string;
	status: string;
}

export class ExampleOutputDto implements IExampleOutputDtoProps {
	public constructor(props: IExampleOutputDtoProps) {
		this.id = props.id;
		this.name = props.name;
		this.status = props.status;
	}

	@ApiProperty({
		description: "The id of the example",
		example: "019ad951-368a-7de5-b7ba-add19cfd187b",
		required: true,
		type: String,
	})
	public id: string;

	@ApiProperty({
		description: "The name of the example",
		example: "Example",
		required: true,
		type: String,
	})
	public name: string;

	@ApiProperty({
		description: "The status of the example",
		example: "draft",
		required: true,
		type: String,
	})
	public status: string;
}

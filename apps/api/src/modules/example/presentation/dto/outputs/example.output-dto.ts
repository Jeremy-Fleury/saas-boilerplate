import { ApiProperty } from "@nestjs/swagger";

export class ExampleOutputDto {
	@ApiProperty({
		description: "The id of the example",
		example: "019ad951-368a-7de5-b7ba-add19cfd187b",
		required: true,
		type: String,
	})
	public id!: string;

	@ApiProperty({
		description: "The name of the example",
		example: "Example",
		required: true,
		type: String,
	})
	public name!: string;

	@ApiProperty({
		description: "The status of the example",
		example: "draft",
		required: true,
		type: String,
	})
	public status!: string;
}
